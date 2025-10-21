import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { SITE_PARAM, ID_PARAM, PAGINATION_PARAMS, SEARCH_PARAM, ORDER_PARAMS, FORCE_DELETE_PARAM } from '../schemas/common.js';

export const userTools: Tool[] = [
    // ==========================================
    // USERS CRUD
    // ==========================================
    {
        name: 'claudeus_wp_users__get_users',
        description: 'Get a list of users with optional filters. Retrieve WordPress users with pagination and filtering.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM,
                filters: {
                    type: 'object',
                    description: 'Optional filters for users query',
                    properties: {
                        ...PAGINATION_PARAMS,
                        search: SEARCH_PARAM,
                        exclude: {
                            type: 'array',
                            description: 'Exclude specific user IDs',
                            items: { type: 'number' }
                        },
                        include: {
                            type: 'array',
                            description: 'Limit results to specific user IDs',
                            items: { type: 'number' }
                        },
                        offset: {
                            type: 'number',
                            description: 'Offset the result set by a specific number of items'
                        },
                        ...ORDER_PARAMS,
                        orderby: {
                            type: 'string',
                            description: 'Sort collection by user attribute',
                            enum: ['id', 'include', 'name', 'registered_date', 'slug', 'include_slugs', 'email', 'url']
                        },
                        slug: {
                            type: 'array',
                            description: 'Limit result set to users matching specific slugs',
                            items: { type: 'string' }
                        },
                        roles: {
                            type: 'array',
                            description: 'Limit result set to users matching specific roles',
                            items: { type: 'string' }
                        },
                        capabilities: {
                            type: 'array',
                            description: 'Limit result set to users with specific capabilities',
                            items: { type: 'string' }
                        },
                        who: {
                            type: 'string',
                            description: 'Limit result set to users who are considered authors',
                            enum: ['authors']
                        },
                        has_published_posts: {
                            type: 'boolean',
                            description: 'Limit result set to users who have published posts'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_users__get_user',
        description: 'Get a single user by ID. Retrieve detailed information about a specific WordPress user.',
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
        name: 'claudeus_wp_users__get_me',
        description: 'Get the currently authenticated user. Returns information about the user making the request.',
        inputSchema: {
            type: 'object',
            required: [],
            properties: {
                site: SITE_PARAM
            }
        }
    },
    {
        name: 'claudeus_wp_users__create_user',
        description: 'Create a new WordPress user. Requires username, email, and password.',
        inputSchema: {
            type: 'object',
            required: ['data'],
            properties: {
                site: SITE_PARAM,
                data: {
                    type: 'object',
                    description: 'User data',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Login name for the user (required)'
                        },
                        email: {
                            type: 'string',
                            description: 'Email address for the user (required)',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                            description: 'Password for the user (required)',
                            minLength: 8
                        },
                        name: {
                            type: 'string',
                            description: 'Display name for the user'
                        },
                        first_name: {
                            type: 'string',
                            description: 'First name for the user'
                        },
                        last_name: {
                            type: 'string',
                            description: 'Last name for the user'
                        },
                        url: {
                            type: 'string',
                            description: 'URL of the user',
                            format: 'uri'
                        },
                        description: {
                            type: 'string',
                            description: 'Biography or description of the user'
                        },
                        locale: {
                            type: 'string',
                            description: 'Locale for the user'
                        },
                        nickname: {
                            type: 'string',
                            description: 'Nickname for the user'
                        },
                        slug: {
                            type: 'string',
                            description: 'Alphanumeric identifier for the user'
                        },
                        roles: {
                            type: 'array',
                            description: 'Roles assigned to the user',
                            items: { type: 'string' }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_users__update_user',
        description: 'Update an existing WordPress user. Modify user details, roles, or profile information.',
        inputSchema: {
            type: 'object',
            required: ['id', 'data'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                data: {
                    type: 'object',
                    description: 'Updated user data',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Login name for the user'
                        },
                        email: {
                            type: 'string',
                            description: 'Email address for the user',
                            format: 'email'
                        },
                        password: {
                            type: 'string',
                            description: 'New password for the user',
                            minLength: 8
                        },
                        name: {
                            type: 'string',
                            description: 'Display name for the user'
                        },
                        first_name: {
                            type: 'string',
                            description: 'First name for the user'
                        },
                        last_name: {
                            type: 'string',
                            description: 'Last name for the user'
                        },
                        url: {
                            type: 'string',
                            description: 'URL of the user',
                            format: 'uri'
                        },
                        description: {
                            type: 'string',
                            description: 'Biography or description of the user'
                        },
                        locale: {
                            type: 'string',
                            description: 'Locale for the user'
                        },
                        nickname: {
                            type: 'string',
                            description: 'Nickname for the user'
                        },
                        slug: {
                            type: 'string',
                            description: 'Alphanumeric identifier for the user'
                        },
                        roles: {
                            type: 'array',
                            description: 'Roles assigned to the user',
                            items: { type: 'string' }
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_users__delete_user',
        description: 'Delete a WordPress user. Can reassign their content to another user.',
        inputSchema: {
            type: 'object',
            required: ['id'],
            properties: {
                site: SITE_PARAM,
                id: ID_PARAM,
                force: FORCE_DELETE_PARAM,
                reassign: {
                    type: 'number',
                    description: 'Reassign the deleted user\'s posts and links to this user ID'
                }
            }
        }
    },
    // ==========================================
    // APPLICATION PASSWORDS
    // ==========================================
    {
        name: 'claudeus_wp_users__create_app_password',
        description: 'Create a new application password for a user. Application passwords allow authentication without exposing the user\'s actual password.',
        inputSchema: {
            type: 'object',
            required: ['user_id', 'data'],
            properties: {
                site: SITE_PARAM,
                user_id: {
                    type: 'number',
                    description: 'User ID to create the application password for'
                },
                data: {
                    type: 'object',
                    description: 'Application password data',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name for the application password (e.g., "Mobile App", "CLI Tool")'
                        },
                        app_id: {
                            type: 'string',
                            description: 'UUID provided by the application to uniquely identify it',
                            format: 'uuid'
                        }
                    }
                }
            }
        }
    },
    {
        name: 'claudeus_wp_users__list_app_passwords',
        description: 'List all application passwords for a user. Shows all active application passwords and when they were last used.',
        inputSchema: {
            type: 'object',
            required: ['user_id'],
            properties: {
                site: SITE_PARAM,
                user_id: {
                    type: 'number',
                    description: 'User ID to list application passwords for'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_users__revoke_app_password',
        description: 'Revoke (delete) a specific application password. Immediately invalidates the password.',
        inputSchema: {
            type: 'object',
            required: ['user_id', 'uuid'],
            properties: {
                site: SITE_PARAM,
                user_id: {
                    type: 'number',
                    description: 'User ID who owns the application password'
                },
                uuid: {
                    type: 'string',
                    description: 'UUID of the application password to revoke',
                    format: 'uuid'
                }
            }
        }
    },
    {
        name: 'claudeus_wp_users__introspect_password',
        description: 'Validate and introspect the current application password. Checks if the application password in the current request is valid.',
        inputSchema: {
            type: 'object',
            required: ['user_id'],
            properties: {
                site: SITE_PARAM,
                user_id: {
                    type: 'number',
                    description: 'User ID to introspect the application password for'
                }
            }
        }
    }
];

