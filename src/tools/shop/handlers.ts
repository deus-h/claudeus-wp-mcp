import { ShopAPI } from '../../api/shop.js';
import { ProductFilters, OrderFilters, SalesFilters } from '../../types/index.js';
import { DEFAULT_SITE } from '../../config.js';

export async function handleShopTools(name: string, args: Record<string, unknown>, shopAPI: ShopAPI) {
    // Debug logging
    console.error('Debug - Tool name:', name);
    console.error('Debug - Args:', JSON.stringify(args, null, 2));

    // Always set the default site
    args = {
        site: DEFAULT_SITE,
        ...args
    };

    console.error('Debug - Args after default:', JSON.stringify(args, null, 2));
    console.error('Debug - Filters:', JSON.stringify(args.filters, null, 2));

    // Helper function to parse filters
    const parseFilters = (filters: unknown) => {
        if (typeof filters === 'string') {
            try {
                return JSON.parse(filters);
            } catch (error: unknown) {
                const e = error as Error;
                throw new Error(`Invalid filters format: ${e.message}`);
            }
        }
        return filters;
    };

    switch (name) {
        case 'claudeus_wp_shop__get_products': {
            const filters = parseFilters(args.filters);
            const response = await shopAPI.getProducts(filters as ProductFilters);
            
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(response, null, 2)
                }]
            };
        }
        case 'claudeus_wp_shop__get_orders': {
            const filters = parseFilters(args.filters);
            const response = await shopAPI.getOrders(filters as OrderFilters);
            
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(response, null, 2)
                }]
            };
        }
        case 'claudeus_wp_shop__get_sales': {
            const filters = parseFilters(args.filters);
            const response = await shopAPI.getSalesStats(filters as SalesFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(response, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown shop tool: ${name}`);
    }
} 