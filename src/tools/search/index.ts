import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, PAGINATION_PARAMS, SEARCH_PARAM } from '../schemas/common.js';

export const searchTools: Tool[] = [
    {
        name: 'claudeus_wp_search__search',
        description: 'Universal search across all content. Search posts, pages, categories, tags, and other content types in a single request.',
        inputSchema: {
            type: 'object',
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Search filters',
                    properties: {
                        search: SEARCH_PARAM,
                        type: {
                            type: 'string',
                            description: 'Content type to search (post, term, post-format)',
                            enum: ['post', 'term', 'post-format']
                        },
                        subtype: {
                            type: 'string',
                            description: 'Subtype to search (e.g., "page", "category", "post_tag")'
                        },
                        ...PAGINATION_PARAMS
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_search__oembed',
        description: 'Get oEmbed data for a URL. Retrieve rich embed data (video, images, metadata) for embedding external content.',
        inputSchema: {
            type: 'object',
            required: ['url'],
            properties: {
                site: SITE_PARAM,
                url: {
                    type: 'string',
                    description: 'The URL to get oEmbed data for'
                },
                maxwidth: {
                    type: 'number',
                    description: 'Maximum width of the embed'
                },
                maxheight: {
                    type: 'number',
                    description: 'Maximum height of the embed'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_search__oembed_proxy',
        description: 'Get oEmbed data via proxy. Retrieve oEmbed data for external URLs through WordPress proxy.',
        inputSchema: {
            type: 'object',
            required: ['url'],
            properties: {
                site: SITE_PARAM,
                url: {
                    type: 'string',
                    description: 'The external URL to get oEmbed data for'
                },
                maxwidth: {
                    type: 'number',
                    description: 'Maximum width of the embed'
                },
                maxheight: {
                    type: 'number',
                    description: 'Maximum height of the embed'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_search__get_url_details',
        description: 'Get URL metadata for block editor. Retrieve page title, description, icon, and image for creating rich link previews in blocks.',
        inputSchema: {
            type: 'object',
            required: ['url'],
            properties: {
                site: SITE_PARAM,
                url: {
                    type: 'string',
                    description: 'The URL to get details for'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_search__block_directory',
        description: 'Search WordPress.org block directory. Find and discover blocks available for installation from the official block directory.',
        inputSchema: {
            type: 'object',
            required: ['term'],
            properties: {
                site: SITE_PARAM,
                term: {
                    type: 'string',
                    description: 'Search term for blocks'
                },
                page: {
                    type: 'number',
                    description: 'Page number',
                    minimum: 1,
                    default: 1
                },
                per_page: {
                    type: 'number',
                    description: 'Results per page',
                    minimum: 1,
                    maximum: 100,
                    default: 10
                }
            }
        }
    }
];

