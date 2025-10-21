/**
 * WordPress User Types
 * Based on WordPress REST API /wp/v2/users endpoints
 */

import { QueryParams } from '../api/base-client.js';

/**
 * WordPress User
 */
export interface User {
    /** Unique identifier for the user */
    id: number;
    
    /** Login name for the user */
    username: string;
    
    /** Display name for the user */
    name: string;
    
    /** First name for the user */
    first_name: string;
    
    /** Last name for the user */
    last_name: string;
    
    /** The email address for the user */
    email: string;
    
    /** URL of the user */
    url: string;
    
    /** Description of the user */
    description: string;
    
    /** Author URL of the user */
    link: string;
    
    /** Locale for the user */
    locale: string;
    
    /** The nickname for the user */
    nickname: string;
    
    /** An alphanumeric identifier for the user */
    slug: string;
    
    /** Registration date for the user */
    registered_date: string;
    
    /** Roles assigned to the user */
    roles: string[];
    
    /** All capabilities assigned to the user */
    capabilities: Record<string, boolean>;
    
    /** Any extra capabilities assigned to the user */
    extra_capabilities: Record<string, boolean>;
    
    /** Avatar URLs for the user */
    avatar_urls: {
        24: string;
        48: string;
        96: string;
        [key: string]: string;
    };
    
    /** Meta fields */
    meta: Record<string, unknown>;
}

/**
 * User data for create/update operations
 */
export interface UserData {
    /** Login name for the user (required for creation) */
    username?: string;
    
    /** Display name for the user */
    name?: string;
    
    /** First name for the user */
    first_name?: string;
    
    /** Last name for the user */
    last_name?: string;
    
    /** The email address for the user (required for creation) */
    email?: string;
    
    /** URL of the user */
    url?: string;
    
    /** Description of the user */
    description?: string;
    
    /** Locale for the user */
    locale?: string;
    
    /** The nickname for the user */
    nickname?: string;
    
    /** An alphanumeric identifier for the user */
    slug?: string;
    
    /** Roles assigned to the user */
    roles?: string[];
    
    /** Password for the user (never included in responses) */
    password?: string;
    
    /** Meta fields */
    meta?: Record<string, unknown>;
    
    /** Index signature for compatibility */
    [key: string]: string | string[] | Record<string, unknown> | undefined;
}

/**
 * Filters for querying users
 */
export interface UserFilters extends QueryParams {
    /** Current page of the collection */
    page?: number;
    
    /** Maximum number of items to be returned in result set */
    per_page?: number;
    
    /** Limit results to those matching a string */
    search?: string;
    
    /** Ensure result set excludes specific IDs */
    exclude?: number[];
    
    /** Limit result set to specific IDs */
    include?: number[];
    
    /** Offset the result set by a specific number of items */
    offset?: number;
    
    /** Order sort attribute ascending or descending */
    order?: 'asc' | 'desc';
    
    /** Sort collection by user attribute */
    orderby?: 'id' | 'include' | 'name' | 'registered_date' | 'slug' | 'include_slugs' | 'email' | 'url';
    
    /** Limit result set to users matching at least one specific slug */
    slug?: string[];
    
    /** Limit result set to users matching at least one specific role provided */
    roles?: string[];
    
    /** Limit result set to users with specific capabilities */
    capabilities?: string[];
    
    /** Limit result set to users who are considered authors */
    who?: 'authors';
    
    /** Limit result set to users who have published posts */
    has_published_posts?: boolean | string[];
}

/**
 * Application Password
 */
export interface ApplicationPassword {
    /** Unique identifier for the application password */
    uuid: string;
    
    /** Application password ID */
    app_id: string;
    
    /** The name of the application password */
    name: string;
    
    /** A UUID provided by the application to uniquely identify it */
    password?: string;
    
    /** The GMT datetime the application password was created */
    created: string;
    
    /** The GMT datetime the application password was last used */
    last_used: string | null;
    
    /** The IP address the application password was last used from */
    last_ip: string | null;
}

/**
 * Data for creating application passwords
 */
export interface ApplicationPasswordData {
    /** The name of the application password */
    name: string;
    
    /** A UUID provided by the application to uniquely identify it */
    app_id?: string;
    
    /** Index signature for compatibility */
    [key: string]: string | undefined;
}

/**
 * Application password introspection result
 */
export interface ApplicationPasswordIntrospection {
    /** Whether the password is valid */
    valid: boolean;
    
    /** The application password details if valid */
    password?: ApplicationPassword;
}

