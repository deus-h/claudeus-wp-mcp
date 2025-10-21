/**
 * WordPress Comment Types
 * Based on WordPress REST API /wp/v2/comments endpoints
 */

import { QueryParams } from '../api/base-client.js';

/**
 * Comment status values
 */
export type CommentStatus = 'hold' | 'approve' | 'spam' | 'trash';

/**
 * WordPress Comment
 */
export interface Comment {
    /** Unique identifier for the comment */
    id: number;
    
    /** The ID of the user object, if author was a user */
    author: number;
    
    /** Email address for the comment author */
    author_email: string;
    
    /** IP address for the comment author */
    author_ip: string;
    
    /** Display name for the comment author */
    author_name: string;
    
    /** URL for the comment author */
    author_url: string;
    
    /** User agent for the comment author */
    author_user_agent: string;
    
    /** Avatar URLs for the comment author */
    author_avatar_urls: {
        24: string;
        48: string;
        96: string;
        [key: string]: string;
    };
    
    /** The content for the comment */
    content: {
        /** Content as it exists in the database */
        raw?: string;
        /** HTML content transformed for display */
        rendered: string;
    };
    
    /** The date the comment was published, in the site's timezone */
    date: string;
    
    /** The date the comment was published, as GMT */
    date_gmt: string;
    
    /** URL to the comment */
    link: string;
    
    /** The ID for the parent of the comment */
    parent: number;
    
    /** The ID of the associated post object */
    post: number;
    
    /** State of the comment */
    status: CommentStatus;
    
    /** Type of the comment */
    type: string;
    
    /** Meta fields */
    meta: Record<string, unknown>;
}

/**
 * Data for creating/updating comments
 */
export interface CommentData {
    /** The ID of the user object, if author was a user */
    author?: number;
    
    /** Email address for the comment author */
    author_email?: string;
    
    /** IP address for the comment author */
    author_ip?: string;
    
    /** Display name for the comment author */
    author_name?: string;
    
    /** URL for the comment author */
    author_url?: string;
    
    /** User agent for the comment author */
    author_user_agent?: string;
    
    /** The content for the comment */
    content?: {
        /** Content as it exists in the database */
        raw?: string;
        /** HTML content transformed for display */
        rendered?: string;
    };
    
    /** The date the comment was published, in the site's timezone */
    date?: string;
    
    /** The date the comment was published, as GMT */
    date_gmt?: string;
    
    /** The ID for the parent of the comment */
    parent?: number;
    
    /** The ID of the associated post object */
    post?: number;
    
    /** State of the comment */
    status?: CommentStatus;
    
    /** Meta fields */
    meta?: Record<string, unknown>;
    
    /** Index signature for compatibility */
    [key: string]: string | number | CommentStatus | Record<string, unknown> | { raw?: string; rendered?: string } | undefined;
}

/**
 * Filters for querying comments
 */
export interface CommentFilters extends QueryParams {
    /** Current page of the collection */
    page?: number;
    
    /** Maximum number of items to be returned in result set */
    per_page?: number;
    
    /** Limit results to those matching a string */
    search?: string;
    
    /** Limit response to comments published after a given ISO8601 compliant date */
    after?: string;
    
    /** Limit result set to comments assigned to specific user IDs */
    author?: number[];
    
    /** Ensure result set excludes comments assigned to specific user IDs */
    author_exclude?: number[];
    
    /** Limit result set to comments assigned to specific author email addresses */
    author_email?: string;
    
    /** Limit response to comments published before a given ISO8601 compliant date */
    before?: string;
    
    /** Ensure result set excludes specific IDs */
    exclude?: number[];
    
    /** Limit result set to specific IDs */
    include?: number[];
    
    /** Offset the result set by a specific number of items */
    offset?: number;
    
    /** Order sort attribute ascending or descending */
    order?: 'asc' | 'desc';
    
    /** Sort collection by comment attribute */
    orderby?: 'date' | 'date_gmt' | 'id' | 'include' | 'post' | 'parent' | 'type';
    
    /** Limit result set to comments of specific parent IDs */
    parent?: number[];
    
    /** Ensure result set excludes specific parent IDs */
    parent_exclude?: number[];
    
    /** Limit result set to comments assigned to specific post IDs */
    post?: number[];
    
    /** Limit result set to comments assigned a specific status */
    status?: string;
    
    /** Limit result set to comments assigned a specific type */
    type?: string;
    
    /** The password for the parent post of the comment (if the post is password protected) */
    password?: string;
}

