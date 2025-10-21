import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM } from '../schemas/common.js';

export const themeTools: Tool[] = [
    {
        name: 'claudeus_wp_theme__list',
        description: 'Get a list of installed themes',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for themes query',
                    properties: {
                        status: {
                            type: 'string',
                            enum: ['active', 'inactive', 'parent'],
                            description: 'Filter by theme status'
                        },
                        per_page: {
                            type: 'number',
                            description: 'Maximum number of items to return'
                        },
                        page: {
                            type: 'number',
                            description: 'Current page of the collection'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_theme__get_active',
        description: 'Get the currently active theme',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_theme__activate',
        description: 'Activate a theme by stylesheet name',
        inputSchema: {
            type: 'object',
            required: ['stylesheet'],
            properties: {
                site: SITE_PARAM,
                stylesheet: {
                    type: 'string',
                    description: 'Theme stylesheet name (e.g., "twentytwentyfour")'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_theme__get_customization',
        description: 'Get theme customization settings including custom CSS and theme mods',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_theme__update_customization',
        description: 'Update theme customization settings',
        inputSchema: {
            type: 'object',
            required: ['updates'],
            properties: {
                site: SITE_PARAM,
                updates: {
                    type: 'object',
                    description: 'Customization updates to apply',
                    properties: {
                        custom_css: {
                            type: 'string',
                            description: 'Custom CSS code'
                        },
                        settings: {
                            type: 'object',
                            description: 'Theme settings'
                        },
                        mods: {
                            type: 'object',
                            description: 'Theme modifications',
                            properties: {
                                add: {
                                    type: 'object',
                                    description: 'Modifications to add'
                                },
                                remove: {
                                    type: 'array',
                                    description: 'Modification keys to remove',
                                    items: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_theme__get_custom_css',
        description: 'Get theme custom CSS',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_theme__update_custom_css',
        description: 'Update theme custom CSS',
        inputSchema: {
            type: 'object',
            required: ['css'],
            properties: {
                site: SITE_PARAM,
                css: {
                    type: 'string',
                    description: 'Custom CSS code'
                }
            }
        }
    }
];
