export interface WPLink {
    href: string;
    embeddable?: boolean;
    count?: number;
    templated?: boolean;
}

export interface WPLinks {
    self?: WPLink[];
    collection?: WPLink[];
    about?: WPLink[];
    author?: WPLink[];
    replies?: WPLink[];
    'version-history'?: WPLink[];
    'predecessor-version'?: WPLink[];
    'wp:attachment'?: WPLink[];
    'wp:term'?: WPLink[];
    'wp:featuredmedia'?: WPLink[];
    curies?: Array<{
        name: string;
        href: string;
        templated: boolean;
    }>;
}

export interface WPMeta {
    [key: string]: string | number | boolean | null | undefined;
}

export interface PostFilters {
    page?: number;
    per_page?: number;
    search?: string;
    after?: string;
    author?: number;
    author_exclude?: number[];
    before?: string;
    exclude?: number[];
    include?: number[];
    offset?: number;
    order?: 'asc' | 'desc';
    orderby?: string;
    slug?: string[];
    status?: string;
    categories?: number[];
    categories_exclude?: number[];
    tags?: number[];
    tags_exclude?: number[];
    sticky?: boolean;
}

export interface PostData {
    title: string;
    content: string;
    excerpt?: string;
    status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
    categories?: number[];
    tags?: number[];
    featured_media?: number;
    comment_status?: 'open' | 'closed';
    ping_status?: 'open' | 'closed';
    format?: string;
    meta?: WPMeta;
    sticky?: boolean;
    template?: string;
}

export interface Post extends PostData {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    type: string;
    link: string;
    author: number;
    _links: WPLinks;
}

export interface PageFilters {
    page?: number;
    per_page?: number;
    search?: string;
    after?: string;
    author?: number;
    author_exclude?: number[];
    before?: string;
    exclude?: number[];
    include?: number[];
    menu_order?: number;
    offset?: number;
    order?: 'asc' | 'desc';
    orderby?: string;
    parent?: number[];
    parent_exclude?: number[];
    slug?: string[];
    status?: string;
}

export interface PageData {
    title: string;
    content: string;
    author?: number;
    excerpt?: string;
    featured_media?: number;
    comment_status?: 'open' | 'closed';
    ping_status?: 'open' | 'closed';
    menu_order?: number;
    meta?: WPMeta;
    template?: string;
    parent?: number;
}

export interface Page extends PageData {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    _links: WPLinks;
}

export interface Revision {
    id: number;
    author: number;
    date: string;
    date_gmt: string;
    parent: number;
    modified: string;
    modified_gmt: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    guid: { rendered: string };
}

export interface Autosave {
    id: number;
    author: number;
    date: string;
    date_gmt: string;
    parent: number;
    modified: string;
    modified_gmt: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    preview_link: string;
}

export interface SearchFilters {
    page?: number;
    per_page?: number;
    search: string;
    type?: string;
    subtype?: string;
    exclude?: number[];
}

export interface SearchResult {
    id: number;
    title: string;
    url: string;
    type: string;
    subtype: string;
    _links: WPLinks;
}

export interface ErrorResponse {
    code: string;
    message: string;
    data?: {
        status: number;
        details?: string;
    };
}

export interface SiteConfig {
    url: string;
    username: string;
    auth: string;
    authType: 'basic' | 'jwt';
    restRouteFallback?: boolean;
}

export interface RawSiteConfig {
    URL: string;
    USER: string;
    PASS: string;
    authType?: string;
    restRouteFallback?: boolean;
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

export interface MediaFilters {
    page?: number;
    per_page?: number;
    search?: string;
    after?: string;
    author?: number;
    author_exclude?: number[];
    before?: string;
    exclude?: number[];
    include?: number[];
    offset?: number;
    order?: 'asc' | 'desc';
    orderby?: string;
    parent?: number[];
    parent_exclude?: number[];
    media_type?: 'image' | 'video' | 'audio' | 'application';
    mime_type?: string;
    status?: string;
}

export interface MediaData {
    title?: string;
    caption?: string;
    alt_text?: string;
    description?: string;
    post?: number;
    status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
    meta?: WPMeta;
}

export interface Media {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string; raw?: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string; raw?: string };
    author: number;
    comment_status: string;
    ping_status: string;
    template: string;
    meta: WPMeta;
    description: { rendered: string; raw?: string };
    caption: { rendered: string; raw?: string };
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: {
        width?: number;
        height?: number;
        file?: string;
        sizes?: Record<string, {
            file: string;
            width: number;
            height: number;
            mime_type: string;
            source_url: string;
        }>;
        image_meta?: {
            aperture?: string;
            credit?: string;
            camera?: string;
            caption?: string;
            created_timestamp?: string;
            copyright?: string;
            focal_length?: string;
            iso?: string;
            shutter_speed?: string;
            title?: string;
            orientation?: string;
            keywords?: string[];
        };
        length?: number;
        bitrate?: number;
        fileformat?: string;
        dataformat?: string;
    };
    post?: number;
    source_url: string;
    _links: WPLinks;
}