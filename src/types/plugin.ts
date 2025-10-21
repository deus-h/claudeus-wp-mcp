/**
 * WordPress Plugin Types
 * Based on WordPress REST API /wp/v2/plugins endpoints
 */

/**
 * WordPress Plugin
 */
export interface Plugin {
    /** Plugin file path (e.g., "akismet/akismet.php") */
    plugin?: string;
    
    /** Plugin status (active, inactive, network-active) */
    status?: 'active' | 'inactive' | 'network-active';
    
    /** Plugin name */
    name?: string;
    
    /** Plugin URI */
    plugin_uri?: string;
    
    /** Author name */
    author?: string;
    
    /** Author URI */
    author_uri?: string;
    
    /** Plugin description */
    description?: {
        raw?: string;
        rendered?: string;
    };
    
    /** Plugin version */
    version?: string;
    
    /** Whether plugin can be deleted */
    _deletable?: boolean;
    
    /** Network only plugin */
    network_only?: boolean;
    
    /** Requires WordPress version */
    requires_wp?: string;
    
    /** Requires PHP version */
    requires_php?: string;
    
    /** Text domain */
    textdomain?: string;
    
    /** Update available */
    update?: {
        id?: string;
        slug?: string;
        plugin?: string;
        new_version?: string;
        url?: string;
        package?: string;
        icons?: Record<string, string>;
        banners?: Record<string, string>;
        tested?: string;
        requires_php?: string;
        compatibility?: any;
    };
    
    /** Links */
    _links?: {
        self?: Array<{ href: string }>;
    };
}

/**
 * Plugin filters for listing
 */
export interface PluginFilters {
    /** Filter by status */
    status?: 'active' | 'inactive' | 'network-active';
    
    /** Search plugins by keyword */
    search?: string;
    
    /** Index signature for additional filters */
    [key: string]: string | undefined;
}

/**
 * Data for updating plugin
 */
export interface PluginData {
    /** Plugin status (active, inactive) */
    status?: 'active' | 'inactive';
    
    /** Index signature for additional data */
    [key: string]: string | undefined;
}

