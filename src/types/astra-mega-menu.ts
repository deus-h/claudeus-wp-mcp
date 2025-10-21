/**
 * Astra Mega Menu Types
 * Based on Astra Pro addon /astra_addon/v1/mega_menu endpoints
 */

/**
 * Mega Menu column width types
 */
export type MegaMenuColumnWidth = 'auto' | 'full' | 'custom';

/**
 * Mega Menu display mode
 */
export type MegaMenuDisplayMode = 'vertical' | 'horizontal';

/**
 * Mega Menu column configuration
 */
export interface MegaMenuColumn {
    /** Column width setting */
    width?: string;
    
    /** Content type (widget, content, submenu) */
    content_type?: string;
    
    /** Widget area ID if using widget content */
    widget_area?: string;
    
    /** Custom content if using custom content */
    content?: string;
    
    /** Whether to display submenu items */
    show_submenu?: boolean;
}

/**
 * Astra Mega Menu Configuration
 * Stored as menu item meta
 */
export interface AstraMegaMenu {
    /** Menu item ID this mega menu is attached to */
    menu_item_id: number;
    
    /** Whether mega menu is enabled for this item */
    enabled: boolean;
    
    /** Number of columns (2-6 typically) */
    columns?: number;
    
    /** Display mode */
    display_mode?: MegaMenuDisplayMode;
    
    /** Column width setting */
    column_width?: MegaMenuColumnWidth;
    
    /** Custom width in pixels or percentage */
    custom_width?: string;
    
    /** Column configurations */
    column_config?: MegaMenuColumn[];
    
    /** Whether to hide menu item label */
    hide_label?: boolean;
    
    /** Whether to disable link (make it just a trigger) */
    disable_link?: boolean;
    
    /** Custom CSS classes */
    css_classes?: string[];
    
    /** Icon for menu item */
    icon?: string;
    
    /** Icon position (left, right) */
    icon_position?: 'left' | 'right';
    
    /** Additional settings */
    settings?: Record<string, unknown>;
}

/**
 * Data for creating/updating mega menu configuration
 */
export interface AstraMegaMenuData {
    /** Menu item ID this mega menu is attached to */
    menu_item_id?: number;
    
    /** Whether mega menu is enabled for this item */
    enabled?: boolean;
    
    /** Number of columns */
    columns?: number;
    
    /** Display mode */
    display_mode?: MegaMenuDisplayMode;
    
    /** Column width setting */
    column_width?: MegaMenuColumnWidth;
    
    /** Custom width */
    custom_width?: string;
    
    /** Column configurations */
    column_config?: MegaMenuColumn[];
    
    /** Whether to hide menu item label */
    hide_label?: boolean;
    
    /** Whether to disable link */
    disable_link?: boolean;
    
    /** Custom CSS classes */
    css_classes?: string[];
    
    /** Icon for menu item */
    icon?: string;
    
    /** Icon position */
    icon_position?: 'left' | 'right';
    
    /** Additional settings */
    settings?: Record<string, unknown>;
    
    /** Index signature for compatibility */
    [key: string]: 
        | number 
        | boolean 
        | string 
        | string[] 
        | MegaMenuColumn[] 
        | MegaMenuDisplayMode 
        | MegaMenuColumnWidth 
        | Record<string, unknown> 
        | undefined;
}

