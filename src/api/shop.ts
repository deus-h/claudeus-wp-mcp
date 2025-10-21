import { BaseApiClient, QueryParams } from './base-client.js';
import { SecurityManager } from '../security/SecurityManager.js';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { ErrorResponse, PaginatedResponse, createPaginationMeta } from '../types/index.js';

export interface ProductFilters {
    per_page?: number;
    page?: number;
    search?: string;
    category?: number;
    tag?: number;
    status?: 'draft' | 'pending' | 'private' | 'publish';
    featured?: boolean;
    type?: 'simple' | 'grouped' | 'external' | 'variable';
    [key: string]: string | number | boolean | undefined;
}

export interface OrderFilters {
    per_page?: number;
    page?: number;
    search?: string;
    status?: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed';
    customer?: number;
    product?: number;
    date_created_min?: string;
    date_created_max?: string;
    [key: string]: string | number | undefined;
}

export interface SalesFilters {
    period?: 'day' | 'week' | 'month' | 'year';
    date_min?: string;
    date_max?: string;
    product?: number;
    category?: number;
    [key: string]: string | number | undefined;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    type: string;
    status: string;
    featured: boolean;
    description: string;
    short_description: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_created: string;
    date_modified: string;
    categories: Array<{id: number; name: string; slug: string}>;
    tags: Array<{id: number; name: string; slug: string}>;
    images: Array<{id: number; src: string; name: string; alt: string}>;
}

export interface Order {
    id: number;
    status: string;
    currency: string;
    date_created: string;
    date_modified: string;
    total: string;
    customer_id: number;
    billing: Record<string, string>;
    shipping: Record<string, string>;
    payment_method: string;
    payment_method_title: string;
    line_items: Array<{
        id: number;
        name: string;
        product_id: number;
        quantity: number;
        subtotal: string;
        total: string;
    }>;
}

export interface SalesStats {
    period: string;
    date_start: string;
    date_end: string;
    totals: {
        sales: string;
        orders: number;
        items: number;
        tax: string;
        shipping: string;
        discount: string;
        customers: number;
    };
    products: Array<{
        product_id: number;
        items_sold: number;
        gross_sales: string;
        net_sales: string;
    }>;
}

export class ShopAPI extends BaseApiClient {
    private security: SecurityManager;
    private wcClient: AxiosInstance;

    constructor(client: BaseApiClient, security: SecurityManager) {
        super(client.site);
        this.security = security;
        this.wcClient = axios.create({
            baseURL: `${client.site.url}/wp-json`,
            auth: client.site.authType === 'basic' ? {
                username: client.site.username,
                password: client.site.auth
            } : undefined,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(client.site.authType === 'jwt' ? { 'Authorization': `Bearer ${client.site.auth}` } : {})
            }
        });

        // Add response interceptor for better error handling
        this.wcClient.interceptors.response.use(
            response => response,
            error => {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ErrorResponse>;
                    const errorMessage = axiosError.response?.data?.message || axiosError.message;
                    const errorCode = axiosError.response?.status;
                    throw new Error(`API Error (${errorCode}): ${errorMessage}`);
                }
                throw error;
            }
        );
    }

    private async wcGet<T>(endpoint: string, params?: QueryParams): Promise<PaginatedResponse<T>> {
        try {
            const response = await this.wcClient.get(endpoint, { params });
            
            // Extract pagination metadata from WooCommerce headers
            const pagination = createPaginationMeta(
                response.headers as Record<string, string>,
                params?.page as number || 1,
                params?.per_page as number || 10
            );
            
            return {
                data: response.data,
                pagination
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response?.data?.message) {
                    throw new Error(`API Error: ${axiosError.response.data.message}`);
                } else if (axiosError.response?.status) {
                    throw new Error(`HTTP Error ${axiosError.response.status}: ${axiosError.message}`);
                }
            }
            throw new Error(`Network Error: ${(error as Error).message}`);
        }
    }

    async getProducts(filters?: ProductFilters): Promise<PaginatedResponse<Product[]>> {
        return this.wcGet<Product[]>('/wc/v3/products', filters);
    }

    async getOrders(filters?: OrderFilters): Promise<PaginatedResponse<Order[]>> {
        return this.wcGet<Order[]>('/wc/v3/orders', filters);
    }

    async getSalesStats(filters?: SalesFilters): Promise<PaginatedResponse<SalesStats>> {
        return this.wcGet<SalesStats>('/wc/v3/reports/sales', filters);
    }
} 