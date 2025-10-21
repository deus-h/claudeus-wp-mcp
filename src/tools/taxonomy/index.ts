import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, ID_PARAM, PAGINATION_PARAMS, SEARCH_PARAM, ORDER_PARAMS, FORCE_DELETE_PARAM } from '../schemas/common.js';

export const taxonomyTools: Tool[] = [
    // ==========================================
    // CATEGORIES CRUD
    // ==========================================
    {
        name: 'claudeus_wp_taxonomy__get_categories',
        description: 'Get a list of categories with optional filters. Categories are hierarchical terms used to organize posts.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for categories query',
                    properties: {
                        ...PAGINATION_PARAMS,
                        search: SEARCH_PARAM,
                        exclude: {
                            type: 'array',
                            description: 'Exclude specific category IDs',
                            items: { type: 'number' }
                        },
                        include: {
                            type: 'array',
                            description: 'Limit results to specific category IDs',
                            items: { type: 'number' }
                        },
                        ...ORDER_PARAMS,
                        orderby: {
                            type: 'string',
                            description: 'Sort collection by attribute',
                            enum: ['id', 'include', 'name', 'slug', 'term_group', 'description', 'count']
                        },
                        hide_empty: {
                            type: 'boolean',
                            description: 'Whether to hide categories not assigned to any posts'
                        },
                        parent: {
                            type: 'number',
                            description: 'Limit result set to terms with a specific parent'
                        },
                        slug: {
                            type: 'array',
                            description: 'Limit result set to categories with specific slugs',
                            items: { type: 'string' }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__get_category',
        description: 'Get a single category by ID',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__create_category',
        description: 'Create a new category',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Category data',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Category name'
                        },
                        description: {
                            type: 'string',
                            description: 'Category description'
                        },
                        slug: {
                            type: 'string',
                            description: 'URL-friendly slug'
                        },
                        parent: {
                            type: 'number',
                            description: 'Parent category ID (for hierarchical categories)'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__update_category',
        description: 'Update an existing category',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                data: {
                    type: 'object',
                    description: 'Updated category data',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Category name'
                        },
                        description: {
                            type: 'string',
                            description: 'Category description'
                        },
                        slug: {
                            type: 'string',
                            description: 'URL-friendly slug'
                        },
                        parent: {
                            type: 'number',
                            description: 'Parent category ID'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__delete_category',
        description: 'Delete a category',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                force: FORCE_DELETE_PARAM
            }
        }
    },
    // ==========================================
    // TAGS CRUD
    // ==========================================
    {
        name: 'claudeus_wp_taxonomy__get_tags',
        description: 'Get a list of tags with optional filters. Tags are non-hierarchical terms used to organize posts.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for tags query',
                    properties: {
                        ...PAGINATION_PARAMS,
                        search: SEARCH_PARAM,
                        exclude: {
                            type: 'array',
                            description: 'Exclude specific tag IDs',
                            items: { type: 'number' }
                        },
                        include: {
                            type: 'array',
                            description: 'Limit results to specific tag IDs',
                            items: { type: 'number' }
                        },
                        ...ORDER_PARAMS,
                        orderby: {
                            type: 'string',
                            description: 'Sort collection by attribute',
                            enum: ['id', 'include', 'name', 'slug', 'term_group', 'description', 'count']
                        },
                        hide_empty: {
                            type: 'boolean',
                            description: 'Whether to hide tags not assigned to any posts'
                        },
                        slug: {
                            type: 'array',
                            description: 'Limit result set to tags with specific slugs',
                            items: { type: 'string' }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__get_tag',
        description: 'Get a single tag by ID',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__create_tag',
        description: 'Create a new tag',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Tag data',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Tag name'
                        },
                        description: {
                            type: 'string',
                            description: 'Tag description'
                        },
                        slug: {
                            type: 'string',
                            description: 'URL-friendly slug'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__update_tag',
        description: 'Update an existing tag',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                data: {
                    type: 'object',
                    description: 'Updated tag data',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Tag name'
                        },
                        description: {
                            type: 'string',
                            description: 'Tag description'
                        },
                        slug: {
                            type: 'string',
                            description: 'URL-friendly slug'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__delete_tag',
        description: 'Delete a tag',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                force: FORCE_DELETE_PARAM
            }
        }
    },
    // ==========================================
    // TAXONOMY DISCOVERY
    // ==========================================
    {
        name: 'claudeus_wp_taxonomy__get_taxonomies',
        description: 'Get all registered taxonomies on the WordPress site',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_taxonomy__get_taxonomy',
        description: 'Get a specific taxonomy by slug',
        inputSchema: {
            type: 'object',
            required: ['slug'],
            properties: {
                site: SITE_PARAM,
                slug: {
                    type: 'string',
                    description: 'Taxonomy slug (e.g., "category", "post_tag", "custom_taxonomy")'
                }
            }
        }
    }
];
