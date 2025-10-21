/**
 * WordPress Taxonomy Types
 * Types for categories, tags, and taxonomies REST API
 */

/**
 * Category data structure
 */
export interface Category {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: 'category';
    parent: number;
    meta: Record<string, any>;
}

/**
 * Tag data structure
 */
export interface Tag {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: 'post_tag';
    meta: Record<string, any>;
}

/**
 * Generic term structure for custom taxonomies
 */
export interface Term {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent?: number;
    meta: Record<string, any>;
}

/**
 * Taxonomy information
 */
export interface Taxonomy {
    name: string;
    slug: string;
    description: string;
    types: string[];
    hierarchical: boolean;
    rest_base: string;
    rest_namespace: string;
}

/**
 * Category filters for querying
 */
export interface CategoryFilters {
    context?: 'view' | 'embed' | 'edit';
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: 'id' | 'include' | 'name' | 'slug' | 'include_slugs' | 'term_group' | 'description' | 'count';
    hide_empty?: boolean;
    parent?: number;
    post?: number;
    slug?: string[];
    [key: string]: string | number | boolean | Array<string | number> | null | undefined;
}

/**
 * Tag filters for querying
 */
export interface TagFilters {
    context?: 'view' | 'embed' | 'edit';
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: 'id' | 'include' | 'name' | 'slug' | 'include_slugs' | 'term_group' | 'description' | 'count';
    hide_empty?: boolean;
    post?: number;
    slug?: string[];
    [key: string]: string | number | boolean | Array<string | number> | null | undefined;
}

/**
 * Generic term filters for custom taxonomies
 */
export interface TermFilters {
    context?: 'view' | 'embed' | 'edit';
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: 'id' | 'include' | 'name' | 'slug' | 'include_slugs' | 'term_group' | 'description' | 'count';
    hide_empty?: boolean;
    parent?: number;
    post?: number;
    slug?: string[];
    [key: string]: string | number | boolean | Array<string | number> | null | undefined;
}

/**
 * Data for creating/updating a category
 */
export interface CategoryData {
    name: string;
    description?: string;
    slug?: string;
    parent?: number;
    meta?: Record<string, any>;
    [key: string]: unknown;
}

/**
 * Data for creating/updating a tag
 */
export interface TagData {
    name: string;
    description?: string;
    slug?: string;
    meta?: Record<string, any>;
    [key: string]: unknown;
}

/**
 * Data for creating/updating a custom taxonomy term
 */
export interface TermData {
    name: string;
    description?: string;
    slug?: string;
    parent?: number;
    meta?: Record<string, any>;
    [key: string]: unknown;
}

