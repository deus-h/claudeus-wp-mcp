/**
 * WordPress Template Types (FSE - Full Site Editing)
 * Based on WordPress REST API /wp/v2/templates and /wp/v2/template-parts endpoints
 */

import { QueryParams } from '../api/base-client.js';

/**
 * Template part area types
 */
export type TemplatePartArea = 'header' | 'footer' | 'sidebar' | 'general' | 'uncategorized';

/**
 * WordPress Template (wp_template custom post type)
 */
export interface Template {
    /** Template ID (slug format, e.g., "twentytwentyfour//home") */
    id: string;
    
    /** Theme slug that provides the template */
    theme: string;
    
    /** Template slug (e.g., "home", "single", "page") */
    slug: string;
    
    /** Whether this is a custom template (user-created) */
    is_custom: boolean;
    
    /** Template title */
    title: {
        raw: string;
        rendered: string;
    };
    
    /** Template description */
    description: string;
    
    /** Template status */
    status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
    
    /** WordPress post ID (if customized) */
    wp_id?: number;
    
    /** Whether the template has theme file */
    has_theme_file: boolean;
    
    /** Template author */
    author?: number;
    
    /** Template type (e.g., "wp_template") */
    type: string;
    
    /** Source of the template (theme, plugin, custom) */
    source: string;
    
    /** Origin of the template */
    origin?: string;
    
    /** Template content (block markup) */
    content: {
        raw: string;
        block_version?: number;
    };
    
    /** Associated post type */
    post_type?: string;
    
    /** Template area (for template-parts) */
    area?: TemplatePartArea;
    
    /** Modified date */
    modified?: string;
}

/**
 * Template data for create/update operations
 */
export interface TemplateData {
    /** Template slug */
    slug?: string;
    
    /** Theme slug */
    theme?: string;
    
    /** Template type */
    type?: string;
    
    /** Template content (block markup) */
    content?: string | { raw: string };
    
    /** Template title */
    title?: string | { raw: string };
    
    /** Template description */
    description?: string;
    
    /** Template status */
    status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
    
    /** Template author */
    author?: number;
    
    /** Template area (for template-parts) */
    area?: TemplatePartArea;
    
    /** Index signature for compatibility */
    [key: string]: string | number | TemplatePartArea | { raw: string } | undefined;
}

/**
 * Filters for querying templates
 */
export interface TemplateFilters extends QueryParams {
    /** Limit to the specified post id */
    wp_id?: number;
    
    /** Limit to the specified template part area */
    area?: TemplatePartArea;
    
    /** Post type to get the templates for */
    post_type?: string;
}

/**
 * Template Part (wp_template_part custom post type)
 */
export interface TemplatePart extends Template {
    /** Template part area */
    area: TemplatePartArea;
}

