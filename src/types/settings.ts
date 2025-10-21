/**
 * WordPress Site Settings Types
 * Based on WordPress REST API /wp/v2/settings endpoints
 */

/**
 * WordPress Site Settings
 */
export interface SiteSettings {
    /** Site title */
    title?: string;
    
    /** Site tagline/description */
    description?: string;
    
    /** Site URL */
    url?: string;
    
    /** Site email */
    email?: string;
    
    /** Site timezone */
    timezone?: string;
    
    /** Date format */
    date_format?: string;
    
    /** Time format */
    time_format?: string;
    
    /** Week starts on (0 = Sunday, 1 = Monday) */
    start_of_week?: number;
    
    /** Site language */
    language?: string;
    
    /** Use HTTPS for WordPress URLs */
    use_smilies?: boolean;
    
    /** Default post category */
    default_category?: number;
    
    /** Default post format */
    default_post_format?: string;
    
    /** Posts per page */
    posts_per_page?: number;
    
    /** Default comment status (open, closed) */
    default_comment_status?: 'open' | 'closed';
    
    /** Default ping status */
    default_ping_status?: 'open' | 'closed';
    
    /** Index signature for additional settings */
    [key: string]: any;
}

/**
 * WordPress Post Type
 */
export interface PostType {
    /** Post type capabilities */
    capabilities?: Record<string, string>;
    
    /** Post type description */
    description?: string;
    
    /** Whether the post type is hierarchical */
    hierarchical?: boolean;
    
    /** Post type labels */
    labels?: {
        name?: string;
        singular_name?: string;
        add_new?: string;
        add_new_item?: string;
        edit_item?: string;
        new_item?: string;
        view_item?: string;
        view_items?: string;
        search_items?: string;
        not_found?: string;
        not_found_in_trash?: string;
        parent_item_colon?: string;
        all_items?: string;
        archives?: string;
        attributes?: string;
        insert_into_item?: string;
        uploaded_to_this_item?: string;
        featured_image?: string;
        set_featured_image?: string;
        remove_featured_image?: string;
        use_featured_image?: string;
        menu_name?: string;
        filter_items_list?: string;
        items_list_navigation?: string;
        items_list?: string;
        name_admin_bar?: string;
        item_published?: string;
        item_published_privately?: string;
        item_reverted_to_draft?: string;
        item_scheduled?: string;
        item_updated?: string;
    };
    
    /** Post type name/slug */
    name?: string;
    
    /** Post type slug */
    slug?: string;
    
    /** Supported features */
    supports?: Record<string, boolean>;
    
    /** Taxonomies registered to the post type */
    taxonomies?: string[];
    
    /** REST API base route */
    rest_base?: string;
    
    /** REST API namespace */
    rest_namespace?: string;
    
    /** Whether the post type is viewable */
    viewable?: boolean;
}

/**
 * WordPress Post Status
 */
export interface PostStatus {
    /** Status name/slug */
    name?: string;
    
    /** Status slug */
    slug?: string;
    
    /** Whether posts with this status are private */
    private?: boolean;
    
    /** Whether posts with this status are protected */
    protected?: boolean;
    
    /** Whether posts with this status are public */
    public?: boolean;
    
    /** Whether posts with this status are queryable */
    queryable?: boolean;
    
    /** Whether to show posts with this status in admin list */
    show_in_admin_all_list?: boolean;
    
    /** Whether to show posts with this status in admin status list */
    show_in_admin_status_list?: boolean;
    
    /** Number of posts with this status */
    _builtin?: boolean;
    
    /** Status label */
    label?: string;
}

/**
 * Data for updating site settings
 */
export interface SiteSettingsData {
    /** Site title */
    title?: string;
    
    /** Site tagline/description */
    description?: string;
    
    /** Site email */
    email?: string;
    
    /** Site timezone */
    timezone?: string;
    
    /** Date format */
    date_format?: string;
    
    /** Time format */
    time_format?: string;
    
    /** Week starts on (0 = Sunday, 1 = Monday) */
    start_of_week?: number;
    
    /** Site language */
    language?: string;
    
    /** Use smilies */
    use_smilies?: boolean;
    
    /** Default post category */
    default_category?: number;
    
    /** Default post format */
    default_post_format?: string;
    
    /** Posts per page */
    posts_per_page?: number;
    
    /** Default comment status */
    default_comment_status?: 'open' | 'closed';
    
    /** Default ping status */
    default_ping_status?: 'open' | 'closed';
    
    /** Index signature for additional settings */
    [key: string]: any;
}

