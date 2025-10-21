import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, PAGINATION_PARAMS, SEARCH_PARAM, ORDER_PARAMS } from '../schemas/common.js';

export const patternTools: Tool[] = [
    {
        name: 'claudeus_wp_patterns__get_local',
        description: 'Get all registered block patterns from the site. Includes patterns from core, active theme, and plugins.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_patterns__get_categories',
        description: 'Get all pattern categories. Lists categories like "Featured", "Buttons", "Headers", "Footers", etc.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_patterns__search_directory',
        description: 'Search the WordPress.org pattern directory. Browse thousands of patterns from the community.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Search and filter options',
                    properties: {
                        ...PAGINATION_PARAMS,
                        search: SEARCH_PARAM,
                        category: {
                            type: 'number',
                            description: 'Filter by category ID',
                            minimum: 1
                        },
                        keyword: {
                            type: 'number',
                            description: 'Filter by keyword ID',
                            minimum: 1
                        },
                        slug: {
                            type: 'array',
                            description: 'Filter by specific pattern slugs',
                            items: {
                                type: 'string'
                            }
                        },
                        ...ORDER_PARAMS,
                        orderby: {
                            type: 'string',
                            description: 'Sort collection by attribute',
                            enum: ['author', 'date', 'id', 'include', 'modified', 'parent', 'relevance', 'slug', 'include_slugs', 'title', 'favorite_count'],
                            default: 'date'
                        }
                    }
                }
            }
        }
    }
];

