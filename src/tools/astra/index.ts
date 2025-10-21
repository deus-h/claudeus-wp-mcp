import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, ID_PARAM } from '../schemas/common.js';

export const astraTools: Tool[] = [
    // ==========================================
    // ASTRA MEGA MENUS
    // ==========================================
    {
        name: 'claudeus_wp_astra__get_mega_menu',
        description: 'Get Astra mega menu configuration for a specific menu item. Shows columns, content, and display settings for advanced dropdown menus.',
        inputSchema: {
            type: 'object',
            required: ['menu_item_id'],
            properties: {
                site: SITE_PARAM,
                menu_item_id: {
                    type: 'number',
                    description: 'The menu item ID to get mega menu configuration for'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_astra__update_mega_menu',
        description: 'Create or update Astra mega menu configuration. Configure columns, content, display mode, and styling for advanced dropdown menus.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Mega menu configuration data',
                    properties: {
                        menu_item_id: {
                            type: 'number',
                            description: 'The menu item ID to configure mega menu for (required)'
                        },
                        enabled: {
                            type: 'boolean',
                            description: 'Whether mega menu is enabled for this item'
                        },
                        columns: {
                            type: 'number',
                            description: 'Number of columns (2-6)',
                            minimum: 2,
                            maximum: 6
                        },
                        display_mode: {
                            type: 'string',
                            description: 'Display mode for mega menu',
                            enum: ['vertical', 'horizontal']
                        },
                        column_width: {
                            type: 'string',
                            description: 'Column width setting',
                            enum: ['auto', 'full', 'custom']
                        },
                        custom_width: {
                            type: 'string',
                            description: 'Custom width in pixels or percentage (e.g., "800px" or "80%")'
                        },
                        hide_label: {
                            type: 'boolean',
                            description: 'Whether to hide the menu item label'
                        },
                        disable_link: {
                            type: 'boolean',
                            description: 'Whether to disable the link (make it just a trigger)'
                        },
                        css_classes: {
                            type: 'array',
                            description: 'Custom CSS classes for styling',
                            items: { type: 'string' }
                        },
                        icon: {
                            type: 'string',
                            description: 'Icon for the menu item (icon class or URL)'
                        },
                        icon_position: {
                            type: 'string',
                            description: 'Icon position',
                            enum: ['left', 'right']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_astra__enable_mega_menu',
        description: 'Enable Astra mega menu for a menu item with default settings. Quick way to turn a regular menu item into a mega menu.',
        inputSchema: {
            type: 'object',
            required: ['menu_item_id'],
            properties: {
                site: SITE_PARAM,
                menu_item_id: {
                    type: 'number',
                    description: 'The menu item ID to enable mega menu for'
                },
                columns: {
                    type: 'number',
                    description: 'Number of columns (default: 3)',
                    minimum: 2,
                    maximum: 6,
                    default: 3
                }
            }
        }
    },
    {
        name: 'claudeus_wp_astra__disable_mega_menu',
        description: 'Disable Astra mega menu for a menu item. Reverts the menu item to standard dropdown behavior.',
        inputSchema: {
            type: 'object',
            required: ['menu_item_id'],
            properties: {
                site: SITE_PARAM,
                menu_item_id: {
                    type: 'number',
                    description: 'The menu item ID to disable mega menu for'
                }
            }
        }
    },
    // ==========================================
    // ASTRA CUSTOM LAYOUTS
    // ==========================================
    {
        name: 'claudeus_wp_astra__get_custom_layouts',
        description: 'Get all Astra custom layouts (headers, footers, hooks). List all conditional layout overrides.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_astra__get_custom_layout',
        description: 'Get a specific Astra custom layout by ID. View configuration, content, and display rules.',
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
        name: 'claudeus_wp_astra__create_custom_layout',
        description: 'Create a new Astra custom layout. Create custom headers, footers, or hook-based layouts with conditional display rules.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Custom layout data',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Layout title'
                        },
                        content: {
                            type: 'string',
                            description: 'Layout content (HTML/block markup)'
                        },
                        status: {
                            type: 'string',
                            description: 'Layout status',
                            enum: ['publish', 'draft', 'pending', 'private'],
                            default: 'publish'
                        },
                        'ast-advanced-hook-layout': {
                            type: 'string',
                            description: 'Layout type',
                            enum: ['header', 'footer', 'hooks', '404-page', 'content']
                        },
                        'ast-advanced-hook-location': {
                            type: 'string',
                            description: 'Display location/hook for the layout'
                        },
                        'ast-advanced-hook-action': {
                            type: 'string',
                            description: 'WordPress action hook name (for hooks layout type)'
                        },
                        'ast-advanced-hook-priority': {
                            type: 'number',
                            description: 'Hook priority (default: 10)',
                            default: 10
                        },
                        'ast-advanced-display-rules': {
                            type: 'object',
                            description: 'Conditional display rules (pages, posts, archives, etc.)'
                        },
                        'ast-advanced-user-rules': {
                            type: 'object',
                            description: 'User-based display rules (logged in, roles, etc.)'
                        },
                        'ast-advanced-device-rules': {
                            type: 'array',
                            description: 'Device visibility (desktop, tablet, mobile)',
                            items: {
                                type: 'string',
                                enum: ['desktop', 'tablet', 'mobile']
                            }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_astra__update_custom_layout',
        description: 'Update an existing Astra custom layout. Modify content, display rules, or settings.',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                data: {
                    type: 'object',
                    description: 'Updated layout data',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Layout title'
                        },
                        content: {
                            type: 'string',
                            description: 'Layout content (HTML/block markup)'
                        },
                        status: {
                            type: 'string',
                            description: 'Layout status',
                            enum: ['publish', 'draft', 'pending', 'private']
                        },
                        'ast-advanced-hook-layout': {
                            type: 'string',
                            description: 'Layout type',
                            enum: ['header', 'footer', 'hooks', '404-page', 'content']
                        },
                        'ast-advanced-hook-location': {
                            type: 'string',
                            description: 'Display location/hook'
                        },
                        'ast-advanced-hook-action': {
                            type: 'string',
                            description: 'WordPress action hook name'
                        },
                        'ast-advanced-hook-priority': {
                            type: 'number',
                            description: 'Hook priority'
                        },
                        'ast-advanced-display-rules': {
                            type: 'object',
                            description: 'Conditional display rules'
                        },
                        'ast-advanced-user-rules': {
                            type: 'object',
                            description: 'User-based display rules'
                        },
                        'ast-advanced-device-rules': {
                            type: 'array',
                            description: 'Device visibility',
                            items: {
                                type: 'string',
                                enum: ['desktop', 'tablet', 'mobile']
                            }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_astra__delete_custom_layout',
        description: 'Delete an Astra custom layout. Removes the custom header, footer, or hook layout.',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                force: {
                    type: 'boolean',
                    description: 'Whether to force delete (bypass trash)',
                    default: false
                }
            }
        }
    },
    // ==========================================
    // ASTRA THEME SETTINGS
    // ==========================================
    {
        name: 'claudeus_wp_astra__get_settings',
        description: 'Get all Astra theme settings. Returns complete theme configuration including header, footer, colors, typography, layout, and more.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_astra__update_settings',
        description: 'Update Astra theme settings. Configure header, footer, colors, typography, layout settings, and more.',
        inputSchema: {
            type: 'object',
            required: ['settings'],
            properties: {
                site: SITE_PARAM,
                settings: {
                    type: 'object',
                    description: 'Theme settings to update',
                    properties: {
                        'site-title': { type: 'string', description: 'Site title visibility' },
                        'site-logo': { type: 'string', description: 'Logo URL or ID' },
                        'header-layouts': { type: 'string', description: 'Header layout style' },
                        'footer-sml-layout': { type: 'string', description: 'Footer layout' },
                        'site-layout': { type: 'string', description: 'Overall site layout' },
                        'site-content-layout': { type: 'string', description: 'Content layout (full-width, boxed, etc.)' },
                        'site-sidebar-layout': { type: 'string', description: 'Sidebar position' },
                        'theme-color': { type: 'string', description: 'Primary theme color' },
                        'link-color': { type: 'string', description: 'Link color' },
                        'text-color': { type: 'string', description: 'Text color' },
                        'body-font-family': { type: 'string', description: 'Body font family' },
                        'headings-font-family': { type: 'string', description: 'Headings font family' },
                        'font-size-body': { type: 'object', description: 'Body font size settings' },
                        'site-content-width': { type: 'number', description: 'Content width in pixels' },
                        'blog-layout': { type: 'string', description: 'Blog archive layout' },
                        'single-post-content-layout': { type: 'string', description: 'Single post layout' }
                    }
                }
            }
        }
    }
];

