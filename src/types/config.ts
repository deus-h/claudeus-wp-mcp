export interface SiteCapabilities {
    discovery?: {
        claudeus_wp_discover_endpoints?: boolean;
    };
    posts?: {
        claudeus_wp_content__get_posts?: boolean;
        claudeus_wp_content__create_post?: boolean;
        claudeus_wp_content__update_post?: boolean;
        claudeus_wp_content__delete_post?: boolean;
        claudeus_wp_content__get_post_revisions?: boolean;
    };
    pages?: {
        claudeus_wp_content__get_pages?: boolean;
        claudeus_wp_content__create_page?: boolean;
        claudeus_wp_content__update_page?: boolean;
        claudeus_wp_content__delete_page?: boolean;
    };
    blocks?: {
        claudeus_wp_content__get_blocks?: boolean;
        claudeus_wp_content__create_block?: boolean;
        claudeus_wp_content__update_block?: boolean;
        claudeus_wp_content__delete_block?: boolean;
        claudeus_wp_content__get_block_revisions?: boolean;
    };
    media?: {
        claudeus_wp_media__get_media?: boolean;
        claudeus_wp_media__upload?: boolean;
        claudeus_wp_media__update?: boolean;
        claudeus_wp_media__delete?: boolean;
    };
    themes?: {
        claudeus_wp_theme__list?: boolean;
        claudeus_wp_theme__get_active?: boolean;
        claudeus_wp_theme__activate?: boolean;
        claudeus_wp_theme__get_customization?: boolean;
        claudeus_wp_theme__update_customization?: boolean;
        claudeus_wp_theme__get_custom_css?: boolean;
        claudeus_wp_theme__update_custom_css?: boolean;
    };
    shop?: {
        claudeus_wp_shop__get_products?: boolean;
        claudeus_wp_shop__get_orders?: boolean;
        claudeus_wp_shop__get_sales?: boolean;
    };
}

export interface SiteConfig {
    url: string;
    username: string;
    auth: string;
    authType: 'basic' | 'jwt';
    restRouteFallback?: boolean;
    capabilities?: SiteCapabilities;
}

export interface RawSiteConfig {
    URL: string;
    USER: string;
    PASS: string;
    authType?: string;
    restRouteFallback?: boolean;
    capabilities?: SiteCapabilities;
}

export interface SiteConfigurations {
    [alias: string]: SiteConfig;
}

export interface WordPressSiteResource {
    id: string;
    name: string;
    type: string;
    uri: string;
    metadata: {
        url: string;
        authType: string;
    };
}

export interface ErrorResponse {
    code: string;
    message: string;
    data?: any;
} 