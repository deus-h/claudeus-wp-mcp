import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, FORCE_DELETE_PARAM } from '../schemas/common.js';

export const templateTools: Tool[] = [
    // ==========================================
    // TEMPLATES (FSE)
    // ==========================================
    {
        name: 'claudeus_wp_templates__get_templates',
        description: 'Get a list of block theme templates (FSE). List all available templates for the active theme.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for templates query',
                    properties: {
                        wp_id: {
                            type: 'number',
                            description: 'Limit to the specified post ID'
                        },
                        area: {
                            type: 'string',
                            description: 'Limit to the specified template part area',
                            enum: ['header', 'footer', 'sidebar', 'general', 'uncategorized']
                        },
                        post_type: {
                            type: 'string',
                            description: 'Post type to get the templates for (e.g., "page", "post")'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_templates__get_template',
        description: 'Get a specific template by ID. Template IDs are in slug format (e.g., "twentytwentyfour//home").',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Template ID in slug format (e.g., "twentytwentyfour//home")'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_templates__create_template',
        description: 'Create a new custom template. Create templates for posts, pages, or custom post types.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Template data',
                    properties: {
                        slug: {
                            type: 'string',
                            description: 'Template slug (e.g., "home", "single-post", "page-about")'
                        },
                        theme: {
                            type: 'string',
                            description: 'Theme slug that provides the template'
                        },
                        title: {
                            type: 'string',
                            description: 'Template title'
                        },
                        description: {
                            type: 'string',
                            description: 'Template description'
                        },
                        content: {
                            type: 'string',
                            description: 'Template content (block markup HTML)'
                        },
                        status: {
                            type: 'string',
                            description: 'Template status',
                            enum: ['publish', 'draft', 'pending', 'private']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_templates__update_template',
        description: 'Update an existing template. Modify template content, title, or other properties.',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Template ID in slug format (e.g., "twentytwentyfour//home")'
                },
                data: {
                    type: 'object',
                    description: 'Updated template data',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Template title'
                        },
                        description: {
                            type: 'string',
                            description: 'Template description'
                        },
                        content: {
                            type: 'string',
                            description: 'Template content (block markup HTML)'
                        },
                        status: {
                            type: 'string',
                            description: 'Template status',
                            enum: ['publish', 'draft', 'pending', 'private']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_templates__delete_template',
        description: 'Delete a custom template. Removes user-created templates (theme templates cannot be deleted).',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Template ID to delete'
                },
                force: FORCE_DELETE_PARAM
            }
        }
    },
    // ==========================================
    // TEMPLATE PARTS (FSE)
    // ==========================================
    {
        name: 'claudeus_wp_templates__get_template_parts',
        description: 'Get a list of template parts (headers, footers, etc.). List all available template parts for the active theme.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for template parts query',
                    properties: {
                        wp_id: {
                            type: 'number',
                            description: 'Limit to the specified post ID'
                        },
                        area: {
                            type: 'string',
                            description: 'Limit to the specified template part area',
                            enum: ['header', 'footer', 'sidebar', 'general', 'uncategorized']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_templates__get_template_part',
        description: 'Get a specific template part by ID. Retrieve header, footer, or other template part.',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Template part ID in slug format (e.g., "twentytwentyfour//header")'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_templates__create_template_part',
        description: 'Create a new template part. Create custom headers, footers, sidebars, or general template parts.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Template part data',
                    properties: {
                        slug: {
                            type: 'string',
                            description: 'Template part slug (e.g., "header-custom", "footer-special")'
                        },
                        theme: {
                            type: 'string',
                            description: 'Theme slug that provides the template part'
                        },
                        title: {
                            type: 'string',
                            description: 'Template part title'
                        },
                        description: {
                            type: 'string',
                            description: 'Template part description'
                        },
                        content: {
                            type: 'string',
                            description: 'Template part content (block markup HTML)'
                        },
                        area: {
                            type: 'string',
                            description: 'Template part area',
                            enum: ['header', 'footer', 'sidebar', 'general', 'uncategorized']
                        },
                        status: {
                            type: 'string',
                            description: 'Template part status',
                            enum: ['publish', 'draft', 'pending', 'private']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_templates__update_template_part',
        description: 'Update an existing template part. Modify template part content, area, or other properties.',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Template part ID in slug format (e.g., "twentytwentyfour//header")'
                },
                data: {
                    type: 'object',
                    description: 'Updated template part data',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Template part title'
                        },
                        description: {
                            type: 'string',
                            description: 'Template part description'
                        },
                        content: {
                            type: 'string',
                            description: 'Template part content (block markup HTML)'
                        },
                        area: {
                            type: 'string',
                            description: 'Template part area',
                            enum: ['header', 'footer', 'sidebar', 'general', 'uncategorized']
                        },
                        status: {
                            type: 'string',
                            description: 'Template part status',
                            enum: ['publish', 'draft', 'pending', 'private']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_templates__delete_template_part',
        description: 'Delete a custom template part. Removes user-created template parts (theme template parts cannot be deleted).',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Template part ID to delete'
                },
                force: FORCE_DELETE_PARAM
            }
        }
    }
];

