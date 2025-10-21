import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM } from '../schemas/common.js';

export const settingsTools: Tool[] = [
    {
        name: 'claudeus_wp_settings__get',
        description: 'Get all WordPress site settings. Returns site title, tagline, email, timezone, date/time formats, and more.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_settings__update',
        description: 'Update WordPress site settings. Modify site title, tagline, email, timezone, formats, default category, posts per page, and more.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Settings to update',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Site title'
                        },
                        description: {
                            type: 'string',
                            description: 'Site tagline/description'
                        },
                        email: {
                            type: 'string',
                            description: 'Site admin email address'
                        },
                        timezone: {
                            type: 'string',
                            description: 'Timezone string (e.g., "America/New_York", "UTC")'
                        },
                        date_format: {
                            type: 'string',
                            description: 'PHP date format string'
                        },
                        time_format: {
                            type: 'string',
                            description: 'PHP time format string'
                        },
                        start_of_week: {
                            type: 'number',
                            description: 'Day week starts on (0 = Sunday, 1 = Monday)',
                            minimum: 0,
                            maximum: 6
                        },
                        language: {
                            type: 'string',
                            description: 'Site language code (e.g., "en_US", "es_ES")'
                        },
                        use_smilies: {
                            type: 'boolean',
                            description: 'Convert emoticons to graphics'
                        },
                        default_category: {
                            type: 'number',
                            description: 'Default post category ID'
                        },
                        default_post_format: {
                            type: 'string',
                            description: 'Default post format'
                        },
                        posts_per_page: {
                            type: 'number',
                            description: 'Number of posts to show per page',
                            minimum: 1
                        },
                        default_comment_status: {
                            type: 'string',
                            description: 'Default comment status for new posts',
                            enum: ['open', 'closed']
                        },
                        default_ping_status: {
                            type: 'string',
                            description: 'Default pingback/trackback status',
                            enum: ['open', 'closed']
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_settings__get_post_types',
        description: 'Get all registered post types. Returns built-in types (post, page, attachment) and custom post types with their capabilities and settings.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_settings__get_post_type',
        description: 'Get details for a specific post type. View capabilities, labels, taxonomies, and configuration for any post type.',
        inputSchema: {
            type: 'object',
            required: ['type'],
            properties: {
                site: SITE_PARAM,
                type: {
                    type: 'string',
                    description: 'Post type slug (e.g., "post", "page", "attachment", or custom type)'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_settings__get_post_statuses',
        description: 'Get all registered post statuses. Returns publish, draft, pending, private, and custom statuses with their properties.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM
            }
        }
    }
];

