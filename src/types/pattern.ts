/**
 * WordPress Block Patterns Types (FSE - Full Site Editing)
 * Based on WordPress REST API pattern endpoints
 */

import { QueryParams } from '../api/base-client.js';

/**
 * Block Pattern (registered locally or from pattern directory)
 */
export interface BlockPattern {
    /** Pattern slug/ID */
    id?: number | string;
    
    /** Pattern name/slug */
    name?: string;
    
    /** Pattern title */
    title: string;
    
    /** Pattern description */
    description?: string;
    
    /** Pattern content (block markup HTML) */
    content: string;
    
    /** Pattern categories */
    categories?: string[];
    
    /** Pattern keywords for search */
    keywords?: string[];
    
    /** Block types this pattern is for */
    blockTypes?: string[];
    
    /** Whether the pattern is synced */
    wp_pattern_sync_status?: 'partial' | 'unsynced' | '';
    
    /** Pattern viewport width */
    viewportWidth?: number;
    
    /** Pattern source (e.g., "core", "theme", "plugin") */
    source?: string;
    
    /** Pattern author */
    author?: string | number;
    
    /** Whether pattern has theme file */
    has_theme_file?: boolean;
    
    /** Pattern status */
    status?: 'publish' | 'draft' | 'pending' | 'private';
}

/**
 * Pattern Category
 */
export interface PatternCategory {
    /** Category slug */
    slug: string;
    
    /** Category name */
    name: string;
    
    /** Category label */
    label?: string;
    
    /** Category description */
    description?: string;
}

/**
 * Pattern Directory filters for searching WordPress.org patterns
 */
export interface PatternDirectoryFilters extends QueryParams {
    /** Current page */
    page?: number;
    
    /** Results per page (1-100) */
    per_page?: number;
    
    /** Search string */
    search?: string;
    
    /** Category ID */
    category?: number;
    
    /** Keyword ID */
    keyword?: number;
    
    /** Pattern slugs to filter */
    slug?: string[];
    
    /** Offset */
    offset?: number;
    
    /** Order direction */
    order?: 'asc' | 'desc';
    
    /** Order by field */
    orderby?: 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'include_slugs' | 'title' | 'favorite_count';
}

/**
 * Data for creating/updating patterns (reusable blocks with wp_pattern post type)
 */
export interface PatternData {
    /** Pattern title */
    title?: string | { raw: string };
    
    /** Pattern content (block markup) */
    content?: string | { raw: string };
    
    /** Pattern description */
    description?: string;
    
    /** Pattern status */
    status?: 'publish' | 'draft' | 'pending' | 'private';
    
    /** Pattern sync status */
    wp_pattern_sync_status?: 'partial' | 'unsynced' | '';
    
    /** Pattern categories (taxonomy IDs) */
    wp_pattern_category?: number[];
    
    /** Index signature for compatibility */
    [key: string]: any;
}

