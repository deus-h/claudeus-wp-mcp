import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM } from '../schemas/common.js';

export const globalStylesTools: Tool[] = [
    {
        name: 'claudeus_wp_global_styles__get',
        description: 'Get the current global styles for the site. Returns the customized theme.json settings and styles.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Global styles ID (defaults to "custom" for user customizations)',
                    default: 'custom'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_global_styles__update',
        description: 'Update global styles for the site. Modify colors, typography, spacing, and other design settings.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                id: {
                    type: 'string',
                    description: 'Global styles ID (defaults to "custom")',
                    default: 'custom'
                },
                data: {
                    type: 'object',
                    description: 'Global styles data (theme.json structure)',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Title for the global styles'
                        },
                        styles: {
                            type: 'object',
                            description: 'Styles object (CSS-like structure for blocks and elements)',
                            properties: {
                                color: {
                                    type: 'object',
                                    description: 'Color styles',
                                    properties: {
                                        background: { type: 'string' },
                                        text: { type: 'string' }
                                    }
                                },
                                typography: {
                                    type: 'object',
                                    description: 'Typography styles',
                                    properties: {
                                        fontFamily: { type: 'string' },
                                        fontSize: { type: 'string' },
                                        lineHeight: { type: 'string' }
                                    }
                                },
                                spacing: {
                                    type: 'object',
                                    description: 'Spacing styles'
                                },
                                elements: {
                                    type: 'object',
                                    description: 'Element-specific styles (link, button, heading, etc.)'
                                },
                                blocks: {
                                    type: 'object',
                                    description: 'Block-specific styles'
                                }
                            }
                        },
                        settings: {
                            type: 'object',
                            description: 'Settings object (theme.json settings)',
                            properties: {
                                color: {
                                    type: 'object',
                                    description: 'Color settings',
                                    properties: {
                                        palette: {
                                            type: 'array',
                                            description: 'Color palette',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    slug: { type: 'string' },
                                                    color: { type: 'string' },
                                                    name: { type: 'string' }
                                                }
                                            }
                                        }
                                    }
                                },
                                typography: {
                                    type: 'object',
                                    description: 'Typography settings',
                                    properties: {
                                        fontSizes: {
                                            type: 'array',
                                            description: 'Font sizes',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    slug: { type: 'string' },
                                                    size: { type: 'string' },
                                                    name: { type: 'string' }
                                                }
                                            }
                                        },
                                        fontFamilies: {
                                            type: 'array',
                                            description: 'Font families'
                                        }
                                    }
                                },
                                spacing: {
                                    type: 'object',
                                    description: 'Spacing settings'
                                },
                                layout: {
                                    type: 'object',
                                    description: 'Layout settings',
                                    properties: {
                                        contentSize: { type: 'string' },
                                        wideSize: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_global_styles__get_theme',
        description: 'Get the default global styles for a specific theme. Returns the theme\'s base theme.json configuration.',
        inputSchema: {
            type: 'object',
            required: ['stylesheet'],
            properties: {
                site: SITE_PARAM,
                stylesheet: {
                    type: 'string',
                    description: 'Theme stylesheet name (e.g., "twentytwentyfour", "astra")'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_global_styles__get_variations',
        description: 'Get available style variations for a theme. Returns all pre-defined style variations.',
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
        name: 'claudeus_wp_global_styles__get_revisions',
        description: 'Get revision history for global styles. View all past changes to global styles.',
        inputSchema: {
            type: 'object',
            required: ['parent_id'],
            properties: {
                site: SITE_PARAM,
                parent_id: {
                    type: 'number',
                    description: 'Parent global styles ID (post ID)'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_global_styles__get_revision',
        description: 'Get a specific revision of global styles. View a past version of global styles.',
        inputSchema: {
            type: 'object',
            required: ['parent_id', 'revision_id'],
            properties: {
                site: SITE_PARAM,
                parent_id: {
                    type: 'number',
                    description: 'Parent global styles ID (post ID)'
                },
                revision_id: {
                    type: 'number',
                    description: 'Revision ID'
                }
            }
        }
    }
];

