import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM } from '../schemas/common.js';

export const shopTools: Tool[] = [
    {
        name: 'claudeus_wp_shop__get_products',
        description: 'Get a list of products with optional filters',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for products query',
                    properties: {
                        per_page: { type: 'number' },
                        page: { type: 'number' },
                        search: { type: 'string' },
                        category: { type: 'number' },
                        tag: { type: 'number' },
                        status: { type: 'string', enum: ['draft', 'pending', 'private', 'publish'] },
                        featured: { type: 'boolean' },
                        type: { type: 'string', enum: ['simple', 'grouped', 'external', 'variable'] }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_shop__get_orders',
        description: 'Get a list of orders with optional filters',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for orders query',
                    properties: {
                        per_page: { type: 'number' },
                        page: { type: 'number' },
                        search: { type: 'string' },
                        status: { type: 'string', enum: ['pending', 'processing', 'on-hold', 'completed', 'cancelled', 'refunded', 'failed'] },
                        customer: { type: 'number' },
                        product: { type: 'number' },
                        date_created_min: { type: 'string', format: 'date-time' },
                        date_created_max: { type: 'string', format: 'date-time' }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_shop__get_sales',
        description: 'Get sales statistics with optional filters',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for sales statistics',
                    properties: {
                        period: { type: 'string', enum: ['day', 'week', 'month', 'year'] },
                        date_min: { type: 'string', format: 'date-time' },
                        date_max: { type: 'string', format: 'date-time' },
                        product: { type: 'number' },
                        category: { type: 'number' }
                    }
                }
            }
        }
    }
];
