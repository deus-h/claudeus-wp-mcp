import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM } from '../schemas/common.js';

export const widgetTools: Tool[] = [
    // ==========================================
    // SIDEBARS
    // ==========================================
    {
        name: 'claudeus_wp_widgets__get_sidebars',
        description: 'Get all registered sidebars. List all widget areas with their configuration and assigned widgets.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters',
                    properties: {
                        context: {
                            type: 'string',
                            description: 'Request context',
                            enum: ['view', 'embed', 'edit']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_widgets__get_sidebar',
        description: 'Get a specific sidebar by ID. View sidebar configuration and all widgets assigned to it.',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Sidebar ID (e.g., "sidebar-1", "footer-1")'
                }
            }
        }
    },
    // ==========================================
    // WIDGETS
    // ==========================================
    {
        name: 'claudeus_wp_widgets__get_widgets',
        description: 'Get all widgets. List all widget instances across all sidebars with their settings and rendered output.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters',
                    properties: {
                        sidebar: {
                            type: 'string',
                            description: 'Filter by sidebar ID'
                        },
                        context: {
                            type: 'string',
                            description: 'Request context',
                            enum: ['view', 'embed', 'edit']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_widgets__get_widget',
        description: 'Get a specific widget by ID. View widget type, settings, sidebar placement, and rendered HTML.',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Widget ID (e.g., "text-1", "categories-2")'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_widgets__create_widget',
        description: 'Create a new widget and add it to a sidebar. Add text widgets, category lists, recent posts, custom HTML, and more.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Widget data',
                    properties: {
                        id_base: {
                            type: 'string',
                            description: 'Widget type (e.g., "text", "categories", "recent-posts", "recent-comments", "archives", "meta", "search", "custom_html")'
                        },
                        sidebar: {
                            type: 'string',
                            description: 'Sidebar ID where widget should be placed'
                        },
                        instance: {
                            type: 'object',
                            description: 'Widget-specific settings',
                            properties: {
                                raw: {
                                    type: 'object',
                                    description: 'Widget configuration (varies by widget type, e.g., {title: "My Title", text: "Content"} for text widget)'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_widgets__update_widget',
        description: 'Update an existing widget. Modify widget settings, move to different sidebar, or change configuration.',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Widget ID to update'
                },
                data: {
                    type: 'object',
                    description: 'Updated widget data',
                    properties: {
                        sidebar: {
                            type: 'string',
                            description: 'New sidebar ID (to move widget)'
                        },
                        instance: {
                            type: 'object',
                            description: 'Updated widget settings',
                            properties: {
                                raw: {
                                    type: 'object',
                                    description: 'Updated widget configuration'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_widgets__delete_widget',
        description: 'Delete a widget. Remove widget instance from its sidebar permanently.',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Widget ID to delete'
                },
                force: {
                    type: 'boolean',
                    description: 'Whether to force delete (bypass trash)',
                    default: true
                }
            }
        }
    }
];

