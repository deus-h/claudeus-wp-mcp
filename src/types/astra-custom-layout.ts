/**
 * Astra Custom Layouts Types
 * Custom headers, footers, and hook layouts with conditional display
 */

/**
 * Layout types in Astra
 */
export type AstraLayoutType = 'header' | 'footer' | 'hooks' | '404-page' | 'content';

/**
 * Display locations for layouts
 */
export type AstraLayoutLocation = 
    | 'ast-advanced-hook-location'
    | 'ast-advanced-footer-location'
    | 'ast-advanced-header-location';

/**
 * Astra Custom Layout
 */
export interface AstraCustomLayout {
    /** Layout ID */
    id: number;
    
    /** Layout title */
    title: {
        raw: string;
        rendered: string;
    };
    
    /** Layout content (block markup or PHP) */
    content: {
        raw: string;
        rendered: string;
        protected: boolean;
    };
    
    /** Layout type */
    type: string;
    
    /** Layout status */
    status: 'publish' | 'draft' | 'pending' | 'private';
    
    /** Layout author */
    author: number;
    
    /** Layout slug */
    slug: string;
    
    /** Modified date */
    modified: string;
    
    /** Layout metadata */
    meta?: {
        /** Layout type (header, footer, hooks, etc.) */
        'ast-advanced-hook-layout'?: AstraLayoutType;
        
        /** Display location */
        'ast-advanced-hook-location'?: string;
        
        /** Action hook (for hooks layout) */
        'ast-advanced-hook-action'?: string;
        
        /** Priority */
        'ast-advanced-hook-priority'?: number;
        
        /** Display rules */
        'ast-advanced-display-rules'?: AstraDisplayRules;
        
        /** User rules */
        'ast-advanced-user-rules'?: AstraUserRules;
        
        /** Device rules (desktop, tablet, mobile) */
        'ast-advanced-device-rules'?: string[];
    };
}

/**
 * Display rules for conditional display
 */
export interface AstraDisplayRules {
    /** Rule operator (AND, OR) */
    operator?: 'AND' | 'OR';
    
    /** Display rules array */
    rules?: Array<{
        /** Rule type (basic-global, specific, etc.) */
        type?: string;
        
        /** Specific rule (post, page, archive, etc.) */
        specific?: string;
        
        /** Rule value (post ID, taxonomy term, etc.) */
        value?: string | number;
    }>;
}

/**
 * User rules for conditional display
 */
export interface AstraUserRules {
    /** Rule operator (AND, OR) */
    operator?: 'AND' | 'OR';
    
    /** User rules array */
    rules?: Array<{
        /** Rule type (all, logged-in, logged-out, user-role, etc.) */
        type?: string;
        
        /** Rule value (role name, user ID, etc.) */
        value?: string;
    }>;
}

/**
 * Data for creating/updating custom layouts
 */
export interface AstraCustomLayoutData {
    /** Layout title */
    title?: string | { raw: string };
    
    /** Layout content */
    content?: string | { raw: string };
    
    /** Layout status */
    status?: 'publish' | 'draft' | 'pending' | 'private';
    
    /** Layout type */
    'ast-advanced-hook-layout'?: AstraLayoutType;
    
    /** Display location */
    'ast-advanced-hook-location'?: string;
    
    /** Action hook */
    'ast-advanced-hook-action'?: string;
    
    /** Priority */
    'ast-advanced-hook-priority'?: number;
    
    /** Display rules */
    'ast-advanced-display-rules'?: AstraDisplayRules;
    
    /** User rules */
    'ast-advanced-user-rules'?: AstraUserRules;
    
    /** Device rules */
    'ast-advanced-device-rules'?: string[];
    
    /** Meta data */
    meta?: Record<string, any>;
    
    /** Index signature for compatibility */
    [key: string]: any;
}

