import { QueryParams } from '../api/base-client.js';

export * from './config.js';
export * from './post.js';
export * from './page.js';
export * from './media.js';
export * from './block.js';
export * from './theme.js';
export * from './taxonomy.js';
export * from './pagination.js';
export * from './user.js';
export * from './comment.js';
export * from './menu.js';
export * from './astra-mega-menu.js';
export * from './astra-custom-layout.js';
export * from './template.js';
export * from './global-styles.js';
export * from './pattern.js';
export * from './settings.js';
export * from './plugin.js';
export * from './widget.js';
export * from './health.js';
export * from './search.js';

export interface PostFilters extends QueryParams {
    status?: 'publish' | 'draft' | 'pending' | 'private';
    per_page?: number;
    page?: number;
    search?: string;
    categories?: number[];
    tags?: number[];
    [key: string]: string | number | boolean | Array<string | number> | null | undefined;
}

export interface PostData {
    title: string;
    content: string;
    status?: 'publish' | 'draft' | 'pending' | 'private';
    excerpt?: string;
    categories?: number[];
    tags?: number[];
    [key: string]: unknown;
}

export interface PageFilters extends QueryParams {
    status?: 'publish' | 'draft' | 'pending' | 'private';
    per_page?: number;
    page?: number;
    search?: string;
    parent?: number[];
    [key: string]: string | number | boolean | Array<string | number> | null | undefined;
}

export interface PageData {
    title: string;
    content: string;
    status?: 'publish' | 'draft' | 'pending' | 'private';
    parent?: number;
    menu_order?: number;
    [key: string]: unknown;
}

export interface MediaFilters extends QueryParams {
    per_page?: number;
    page?: number;
    search?: string;
    media_type?: 'image' | 'video' | 'audio' | 'application';
    mime_type?: string;
    [key: string]: string | number | boolean | Array<string | number> | null | undefined;
}

export interface MediaData {
    title?: string;
    caption?: string;
    alt_text?: string;
    description?: string;
    [key: string]: unknown;
}

export interface BlockFilters extends QueryParams {
    per_page?: number;
    page?: number;
    search?: string;
    [key: string]: string | number | boolean | Array<string | number> | null | undefined;
}

export interface BlockData {
    title: string;
    content: string;
    status?: 'publish' | 'draft';
    [key: string]: unknown;
}

export interface ThemeFilters extends QueryParams {
    status?: 'active' | 'inactive' | 'parent';
    per_page?: number;
    page?: number;
    [key: string]: string | number | boolean | Array<string | number> | null | undefined;
}

export interface ThemeCustomizationUpdate {
    custom_css?: string;
    settings?: Record<string, unknown>;
    mods?: {
        add?: Record<string, unknown>;
        remove?: string[];
    };
    [key: string]: unknown;
}

// Shop types
export interface ProductFilters {
    per_page?: number;
    page?: number;
    search?: string;
    category?: number;
    tag?: number;
    status?: 'draft' | 'pending' | 'private' | 'publish';
    featured?: boolean;
    type?: 'simple' | 'grouped' | 'external' | 'variable';
    [key: string]: string | number | boolean | undefined;
}

export interface OrderFilters {
    per_page?: number;
    page?: number;
    search?: string;
    status?: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed';
    customer?: number;
    product?: number;
    date_created_min?: string;
    date_created_max?: string;
    [key: string]: string | number | undefined;
}

export interface SalesFilters {
    period?: 'day' | 'week' | 'month' | 'year';
    date_min?: string;
    date_max?: string;
    product?: number;
    category?: number;
    [key: string]: string | number | undefined;
} 