/**
 * WordPress Search & Discovery Types
 * Based on WordPress REST API search and oEmbed endpoints
 */

/**
 * Search Result Item
 */
export interface SearchResult {
    /** Result ID */
    id?: number | string;
    
    /** Result title */
    title?: string;
    
    /** Result URL */
    url?: string;
    
    /** Result type (post, page, category, tag, etc.) */
    type?: string;
    
    /** Result subtype (post type or taxonomy) */
    subtype?: string;
    
    /** Links */
    _links?: {
        self?: Array<{ href: string }>;
        about?: Array<{ href: string }>;
        collection?: Array<{ href: string }>;
    };
}

/**
 * Search Filters
 */
export interface SearchFilters {
    /** Search query */
    search?: string;
    
    /** Filter by type (post, term, post-format) */
    type?: string;
    
    /** Filter by subtype (post type or taxonomy) */
    subtype?: string;
    
    /** Page number */
    page?: number;
    
    /** Results per page */
    per_page?: number;
    
    /** Index signature for additional filters */
    [key: string]: string | number | undefined;
}

/**
 * oEmbed Response
 */
export interface OEmbedResponse {
    /** oEmbed version */
    version?: string;
    
    /** Type (video, photo, link, rich) */
    type?: string;
    
    /** Provider name */
    provider_name?: string;
    
    /** Provider URL */
    provider_url?: string;
    
    /** Title */
    title?: string;
    
    /** Author name */
    author_name?: string;
    
    /** Author URL */
    author_url?: string;
    
    /** HTML embed code */
    html?: string;
    
    /** Width */
    width?: number;
    
    /** Height */
    height?: number;
    
    /** Thumbnail URL */
    thumbnail_url?: string;
    
    /** Thumbnail width */
    thumbnail_width?: number;
    
    /** Thumbnail height */
    thumbnail_height?: number;
    
    /** Additional data */
    [key: string]: any;
}

/**
 * URL Details for Block Editor
 */
export interface URLDetails {
    /** Page title */
    title?: string;
    
    /** Page description */
    description?: string;
    
    /** Icon URL */
    icon?: string;
    
    /** Image URL */
    image?: string;
    
    /** Additional metadata */
    [key: string]: any;
}

/**
 * Block Directory Item
 */
export interface BlockDirectoryItem {
    /** Block name */
    name?: string;
    
    /** Block title */
    title?: string;
    
    /** Block description */
    description?: string;
    
    /** Block ID */
    id?: string;
    
    /** Block rating */
    rating?: number;
    
    /** Rating count */
    rating_count?: number;
    
    /** Active installations */
    active_installs?: number;
    
    /** Author name */
    author?: string;
    
    /** Author block count */
    author_block_count?: number;
    
    /** Author block rating */
    author_block_rating?: number;
    
    /** Block icon */
    icon?: string;
    
    /** Last updated */
    last_updated?: string;
    
    /** Humanized time since last update */
    humanized_updated?: string;
}

