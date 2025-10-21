import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, ID_PARAM, PAGINATION_PARAMS, SEARCH_PARAM, ORDER_PARAMS, FORCE_DELETE_PARAM } from '../schemas/common.js';

export const commentTools: Tool[] = [
    // ==========================================
    // COMMENTS CRUD
    // ==========================================
    {
        name: 'claudeus_wp_comments__get_comments',
        description: 'Get a list of comments with optional filters. Retrieve comments by post, author, status, date range, and more.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for comments query',
                    properties: {
                        ...PAGINATION_PARAMS,
                        search: SEARCH_PARAM,
                        after: {
                            type: 'string',
                            description: 'Limit to comments published after this date (ISO8601 format)',
                            format: 'date-time'
                        },
                        before: {
                            type: 'string',
                            description: 'Limit to comments published before this date (ISO8601 format)',
                            format: 'date-time'
                        },
                        author: {
                            type: 'array',
                            description: 'Limit to comments by specific user IDs',
                            items: { type: 'number' }
                        },
                        author_exclude: {
                            type: 'array',
                            description: 'Exclude comments by specific user IDs',
                            items: { type: 'number' }
                        },
                        author_email: {
                            type: 'string',
                            description: 'Limit to comments by specific email address',
                            format: 'email'
                        },
                        exclude: {
                            type: 'array',
                            description: 'Exclude specific comment IDs',
                            items: { type: 'number' }
                        },
                        include: {
                            type: 'array',
                            description: 'Limit results to specific comment IDs',
                            items: { type: 'number' }
                        },
                        offset: {
                            type: 'number',
                            description: 'Offset the result set by a specific number of items'
                        },
                        ...ORDER_PARAMS,
                        orderby: {
                            type: 'string',
                            description: 'Sort collection by comment attribute',
                            enum: ['date', 'date_gmt', 'id', 'include', 'post', 'parent', 'type']
                        },
                        parent: {
                            type: 'array',
                            description: 'Limit to comments with specific parent IDs',
                            items: { type: 'number' }
                        },
                        parent_exclude: {
                            type: 'array',
                            description: 'Exclude comments with specific parent IDs',
                            items: { type: 'number' }
                        },
                        post: {
                            type: 'array',
                            description: 'Limit to comments on specific post IDs',
                            items: { type: 'number' }
                        },
                        status: {
                            type: 'string',
                            description: 'Limit to comments with specific status',
                            enum: ['hold', 'approve', 'spam', 'trash']
                        },
                        type: {
                            type: 'string',
                            description: 'Limit to comments of specific type (e.g., "comment", "pingback", "trackback")'
                        },
                        password: {
                            type: 'string',
                            description: 'Password for password-protected post'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_comments__get_comment',
        description: 'Get a single comment by ID. Retrieve detailed information about a specific comment.',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                password: {
                    type: 'string',
                    description: 'Password for password-protected post (if needed)'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_comments__create_comment',
        description: 'Create a new comment on a post. Requires post ID and comment content.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'Comment data',
                    properties: {
                        post: {
                            type: 'number',
                            description: 'The ID of the associated post (required for new comments)'
                        },
                        content: {
                            type: 'object',
                            description: 'The content for the comment',
                            properties: {
                                raw: {
                                    type: 'string',
                                    description: 'Comment content as plain text or HTML'
                                }
                            }
                        },
                        author: {
                            type: 'number',
                            description: 'The ID of the user object, if author is a registered user'
                        },
                        author_name: {
                            type: 'string',
                            description: 'Display name for the comment author'
                        },
                        author_email: {
                            type: 'string',
                            description: 'Email address for the comment author',
                            format: 'email'
                        },
                        author_url: {
                            type: 'string',
                            description: 'URL for the comment author',
                            format: 'uri'
                        },
                        parent: {
                            type: 'number',
                            description: 'The ID of the parent comment (for replies)'
                        },
                        status: {
                            type: 'string',
                            description: 'State of the comment',
                            enum: ['hold', 'approve', 'spam', 'trash']
                        },
                        date: {
                            type: 'string',
                            description: 'The date the comment was published',
                            format: 'date-time'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_comments__update_comment',
        description: 'Update an existing comment. Modify comment content, author info, or status.',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                data: {
                    type: 'object',
                    description: 'Updated comment data',
                    properties: {
                        content: {
                            type: 'object',
                            description: 'The content for the comment',
                            properties: {
                                raw: {
                                    type: 'string',
                                    description: 'Comment content as plain text or HTML'
                                }
                            }
                        },
                        author_name: {
                            type: 'string',
                            description: 'Display name for the comment author'
                        },
                        author_email: {
                            type: 'string',
                            description: 'Email address for the comment author',
                            format: 'email'
                        },
                        author_url: {
                            type: 'string',
                            description: 'URL for the comment author',
                            format: 'uri'
                        },
                        status: {
                            type: 'string',
                            description: 'State of the comment',
                            enum: ['hold', 'approve', 'spam', 'trash']
                        },
                        date: {
                            type: 'string',
                            description: 'The date the comment was published',
                            format: 'date-time'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_comments__delete_comment',
        description: 'Delete a comment permanently or move to trash.',
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
    // COMMENT MODERATION
    // ==========================================
    {
        name: 'claudeus_wp_comments__approve',
        description: 'Approve a comment. Change comment status to "approve" to make it publicly visible.',
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
        name: 'claudeus_wp_comments__spam',
        description: 'Mark a comment as spam. Removes it from public view and marks it for spam filtering.',
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
        name: 'claudeus_wp_comments__trash',
        description: 'Move a comment to trash. Comment can be restored later or permanently deleted.',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM
            }
        }
    }
];

