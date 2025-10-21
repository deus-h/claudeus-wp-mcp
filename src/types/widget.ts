/**
 * WordPress Widget & Sidebar Types
 * Based on WordPress REST API /wp/v2/sidebars and /wp/v2/widgets endpoints
 */

/**
 * WordPress Sidebar
 */
export interface Sidebar {
    /** Sidebar ID */
    id?: string;
    
    /** Sidebar name */
    name?: string;
    
    /** Sidebar description */
    description?: string;
    
    /** CSS class */
    class?: string;
    
    /** HTML tag before widget */
    before_widget?: string;
    
    /** HTML tag after widget */
    after_widget?: string;
    
    /** HTML tag before widget title */
    before_title?: string;
    
    /** HTML tag after widget title */
    after_title?: string;
    
    /** Status (active, inactive) */
    status?: 'active' | 'inactive';
    
    /** Widget IDs in this sidebar */
    widgets?: string[] | Widget[];
}

/**
 * WordPress Widget
 */
export interface Widget {
    /** Widget ID */
    id?: string;
    
    /** Widget ID base (type) */
    id_base?: string;
    
    /** Sidebar ID where widget is placed */
    sidebar?: string;
    
    /** Widget HTML rendered output */
    rendered?: string;
    
    /** Widget HTML form for editing */
    rendered_form?: string;
    
    /** Widget instance settings */
    instance?: {
        /** Encoded widget data */
        encoded?: string;
        /** Hashed widget data */
        hash?: string;
        /** Raw widget data */
        raw?: Record<string, any>;
    };
    
    /** Links */
    _links?: {
        self?: Array<{ href: string }>;
        collection?: Array<{ href: string }>;
        about?: Array<{ href: string }>;
    };
}

/**
 * Data for creating/updating widget
 */
export interface WidgetData {
    /** Widget ID base (type, e.g., 'text', 'categories', 'recent-posts') */
    id_base?: string;
    
    /** Sidebar ID where widget should be placed */
    sidebar?: string;
    
    /** Widget instance settings (type-specific) */
    instance?: {
        encoded?: string;
        hash?: string;
        raw?: Record<string, any>;
    };
    
    /** Index signature for additional data */
    [key: string]: any;
}

/**
 * Sidebar filters for listing
 */
export interface SidebarFilters {
    /** Context for the request (view, embed, edit) */
    context?: 'view' | 'embed' | 'edit';
    
    /** Index signature for additional filters */
    [key: string]: string | undefined;
}

/**
 * Widget filters for listing
 */
export interface WidgetFilters {
    /** Context for the request (view, embed, edit) */
    context?: 'view' | 'embed' | 'edit';
    
    /** Filter by sidebar ID */
    sidebar?: string;
    
    /** Index signature for additional filters */
    [key: string]: string | undefined;
}

