import axios, { AxiosInstance, AxiosError } from 'axios';
import { SiteConfig, ErrorResponse, PaginatedResponse, createPaginationMeta } from '../types/index.js';

export type QueryParams = Record<string, string | number | boolean | Array<string | number> | null | undefined>;

export class BaseApiClient {
  protected client: AxiosInstance;
  protected _site: SiteConfig;

  constructor(site: SiteConfig) {
    this._site = site;
    this.client = axios.create({
      baseURL: `${site.url}/wp-json/wp/v2`,
      auth: site.authType === 'basic' ? {
        username: site.username,
        password: site.auth
      } : undefined,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(site.authType === 'jwt' ? { 'Authorization': `Bearer ${site.auth}` } : {})
      }
    });

    // Add response interceptor for better error handling
    this.client.interceptors.response.use(
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

  get site(): SiteConfig {
    return this._site;
  }

  protected handleError(error: AxiosError<ErrorResponse>): never {
    if (error.response?.data?.message) {
      throw new Error(`API Error: ${error.response.data.message}`);
    } else if (error.response?.status) {
      throw new Error(`HTTP Error ${error.response.status}: ${error.message}`);
    } else {
      throw new Error(`Network Error: ${error.message}`);
    }
  }

  public async get<T>(endpoint: string, params?: QueryParams): Promise<T> {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  /**
   * GET request with pagination metadata
   * Extracts X-WP-Total and X-WP-TotalPages headers
   */
  public async getPaginated<T>(endpoint: string, params?: QueryParams): Promise<PaginatedResponse<T>> {
    try {
      const response = await this.client.get(endpoint, { params });
      
      // Extract pagination metadata from headers
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
      this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  public async post<T, D = Record<string, unknown>>(endpoint: string, data: D): Promise<T> {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  public async put<T, D = Record<string, unknown>>(endpoint: string, data: D): Promise<T> {
    try {
      const response = await this.client.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>);
    }
  }

  public async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await this.client.delete(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>);
    }
  }
} 