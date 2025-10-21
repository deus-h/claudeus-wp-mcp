import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, ID_PARAM, PAGINATION_PARAMS, SEARCH_PARAM, ORDER_PARAMS, FORCE_DELETE_PARAM } from '../schemas/common.js';

export const menuTools: Tool[] = [
    // ==========================================
    // MENUS CRUD
    // ==========================================
    {
        name: 'claudeus_wp_menus__get_menus',
        description: 'Get a list of navigation menus. Retrieve all WordPress menus with pagination and filtering.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for menus query',
                    properties: {
                        ...PAGINATION_PARAMS,
                        search: SEARCH_PARAM,
                        exclude: {
                            type: 'array',
                            description: 'Exclude specific menu IDs',
                            items: { type: 'number' }
                        },
                        include: {
                            type: 'array',
                            description: 'Limit results to specific menu IDs',
                            items: { type: 'number' }
                        },
                        offset: {
                            type: 'number',
                            description: 'Offset the result set by a specific number of items'
                        },
                        ...ORDER_PARAMS,
                        orderby: {
                            type: 'string',
                            description: 'Sort collection by menu attribute',
                            enum: ['id', 'include', 'name', 'slug', 'include_slugs', 'term_group', 'description', 'count']
                        },
                        hide_empty: {
                            type: 'boolean',
                            description: 'Whether to hide menus not assigned to any items'
                        },
                        slug: {
                            type: 'string',
                            description: 'Limit result set to menus with a specific slug'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_menus__get_menu',
        description: 'Get a single menu by ID. Retrieve detailed information about a specific navigation menu.',
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
        name: 'claudeus_wp_menus__create_menu',
        description: 'Create a new navigation menu. Set up a new menu that can be assigned to theme locations.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Menu data',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name/title of the menu (required)'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the menu'
                        },
                        slug: {
                            type: 'string',
                            description: 'An alphanumeric identifier for the menu'
                        },
                        locations: {
                            type: 'array',
                            description: 'The menu locations to assign this menu to',
                            items: { type: 'string' }
                        },
                        auto_add: {
                            type: 'boolean',
                            description: 'Whether to automatically add new top-level pages to this menu'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_menus__update_menu',
        description: 'Update an existing navigation menu. Modify menu properties, name, or location assignments.',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                data: {
                    type: 'object',
                    description: 'Updated menu data',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name/title of the menu'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the menu'
                        },
                        slug: {
                            type: 'string',
                            description: 'An alphanumeric identifier for the menu'
                        },
                        locations: {
                            type: 'array',
                            description: 'The menu locations to assign this menu to',
                            items: { type: 'string' }
                        },
                        auto_add: {
                            type: 'boolean',
                            description: 'Whether to automatically add new top-level pages to this menu'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_menus__delete_menu',
        description: 'Delete a navigation menu. Remove a menu and unassign it from all locations.',
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
    // MENU ITEMS CRUD
    // ==========================================
    {
        name: 'claudeus_wp_menus__get_menu_items',
        description: 'Get a list of menu items. Retrieve items from all menus or filter by specific menu ID.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for menu items query',
                    properties: {
                        ...PAGINATION_PARAMS,
                        search: SEARCH_PARAM,
                        menus: {
                            type: 'number',
                            description: 'Limit results to items in a specific menu ID'
                        },
                        menu_item_type: {
                            type: 'string',
                            description: 'Limit to particular menu item types',
                            enum: ['taxonomy', 'post_type', 'post_type_archive', 'custom']
                        },
                        after: {
                            type: 'string',
                            description: 'Limit to items published after this date (ISO8601 format)',
                            format: 'date-time'
                        },
                        before: {
                            type: 'string',
                            description: 'Limit to items published before this date (ISO8601 format)',
                            format: 'date-time'
                        },
                        exclude: {
                            type: 'array',
                            description: 'Exclude specific menu item IDs',
                            items: { type: 'number' }
                        },
                        include: {
                            type: 'array',
                            description: 'Limit results to specific menu item IDs',
                            items: { type: 'number' }
                        },
                        offset: {
                            type: 'number',
                            description: 'Offset the result set by a specific number of items'
                        },
                        ...ORDER_PARAMS,
                        orderby: {
                            type: 'string',
                            description: 'Sort collection by menu item attribute',
                            enum: ['author', 'date', 'id', 'include', 'modified', 'parent', 'relevance', 'slug', 'include_slugs', 'title', 'menu_order']
                        },
                        slug: {
                            type: 'array',
                            description: 'Limit to items with specific slugs',
                            items: { type: 'string' }
                        },
                        status: {
                            type: 'array',
                            description: 'Limit to items with specific statuses',
                            items: {
                                type: 'string',
                                enum: ['publish', 'future', 'draft', 'pending', 'private']
                            }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_menus__create_menu_item',
        description: 'Create a new menu item. Add a link, page, post, or custom item to a menu.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Menu item data',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'The text for the menu item'
                        },
                        url: {
                            type: 'string',
                            description: 'The URL the menu item points to (for custom links)',
                            format: 'uri'
                        },
                        type: {
                            type: 'string',
                            description: 'The type of menu item',
                            enum: ['taxonomy', 'post_type', 'post_type_archive', 'custom']
                        },
                        object_id: {
                            type: 'number',
                            description: 'The DB ID of the original object (post, page, category, etc.)'
                        },
                        object: {
                            type: 'string',
                            description: 'The type of object (post, page, category, etc.)'
                        },
                        parent: {
                            type: 'number',
                            description: 'The ID of the parent menu item (for sub-items)'
                        },
                        menu_order: {
                            type: 'number',
                            description: 'The order position of the menu item'
                        },
                        menus: {
                            type: 'number',
                            description: 'The ID of the menu this item belongs to (required)'
                        },
                        target: {
                            type: 'string',
                            description: 'The target attribute (_blank for new window)'
                        },
                        attr_title: {
                            type: 'string',
                            description: 'The title attribute for the link'
                        },
                        description: {
                            type: 'string',
                            description: 'The description of the menu item'
                        },
                        classes: {
                            type: 'array',
                            description: 'CSS classes for the menu item',
                            items: { type: 'string' }
                        },
                        xfn: {
                            type: 'array',
                            description: 'XFN relationship values',
                            items: { type: 'string' }
                        },
                        status: {
                            type: 'string',
                            description: 'The status of the menu item',
                            enum: ['publish', 'future', 'draft', 'pending', 'private']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_menus__update_menu_item',
        description: 'Update an existing menu item. Modify text, URL, order, parent, or other properties.',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                data: {
                    type: 'object',
                    description: 'Updated menu item data',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'The text for the menu item'
                        },
                        url: {
                            type: 'string',
                            description: 'The URL the menu item points to',
                            format: 'uri'
                        },
                        parent: {
                            type: 'number',
                            description: 'The ID of the parent menu item'
                        },
                        menu_order: {
                            type: 'number',
                            description: 'The order position of the menu item'
                        },
                        target: {
                            type: 'string',
                            description: 'The target attribute'
                        },
                        attr_title: {
                            type: 'string',
                            description: 'The title attribute for the link'
                        },
                        description: {
                            type: 'string',
                            description: 'The description of the menu item'
                        },
                        classes: {
                            type: 'array',
                            description: 'CSS classes for the menu item',
                            items: { type: 'string' }
                        },
                        xfn: {
                            type: 'array',
                            description: 'XFN relationship values',
                            items: { type: 'string' }
                        },
                        status: {
                            type: 'string',
                            description: 'The status of the menu item',
                            enum: ['publish', 'future', 'draft', 'pending', 'private']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_menus__delete_menu_item',
        description: 'Delete a menu item. Remove an item from a menu.',
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
    // MENU LOCATIONS
    // ==========================================
    {
        name: 'claudeus_wp_menus__get_locations',
        description: 'Get all menu locations registered by the active theme. Shows where menus can be displayed.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM
            }
        }
    }
];

