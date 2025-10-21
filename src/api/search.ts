/**
 * WordPress Search & Discovery API Client
 * Handles universal search, oEmbed, and block directory
 */

import axios, { AxiosInstance } from 'axios';
import { SiteConfig } from '../types/index.js';
import { SearchResult, SearchFilters, OEmbedResponse, URLDetails, BlockDirectoryItem } from '../types/search.js';

export class SearchApiClient {
    protected client: AxiosInstance;
    protected _site: SiteConfig;

    constructor(site: SiteConfig) {
        this._site = site;
        this.client = axios.create({
            baseURL: `${site.url}/wp-json`, // Base URL points to wp-json root
            auth: site.authType === 'basic' ? {
                username: site.username,
                password: site.auth
            } : undefined,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(site.authType === 'jwt' ? { 'Authorization': `Bearer ${site.auth}` } : {})
            }
        });
    }

    get site(): SiteConfig {
        return this._site;
    }

    // ==========================================
    // UNIVERSAL SEARCH
    // ==========================================

    /**
     * Universal search across all content types
     * @param filters Search filters (search term, type, subtype, pagination)
     */
    async search(filters: SearchFilters): Promise<SearchResult[]> {
        try {
            const response = await this.client.get<SearchResult[]>('/wp/v2/search', { params: filters });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to search: ${error}`);
        }
    }

    // ==========================================
    // OEMBED
    // ==========================================

    /**
     * Get oEmbed data for a URL
     * @param url The URL to get oEmbed data for
     * @param maxwidth Optional maximum width
     * @param maxheight Optional maximum height
     */
    async getOEmbed(url: string, maxwidth?: number, maxheight?: number): Promise<OEmbedResponse> {
        try {
            const params: Record<string, string | number> = { url };
            if (maxwidth) params.maxwidth = maxwidth;
            if (maxheight) params.maxheight = maxheight;
            
            const response = await this.client.get<OEmbedResponse>('/oembed/1.0/embed', { params });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get oEmbed data: ${error}`);
        }
    }

    /**
     * Get oEmbed data via proxy (for external URLs)
     * @param url The external URL to get oEmbed data for
     * @param maxwidth Optional maximum width
     * @param maxheight Optional maximum height
     */
    async getOEmbedProxy(url: string, maxwidth?: number, maxheight?: number): Promise<OEmbedResponse> {
        try {
            const params: Record<string, string | number> = { url };
            if (maxwidth) params.maxwidth = maxwidth;
            if (maxheight) params.maxheight = maxheight;
            
            const response = await this.client.get<OEmbedResponse>('/oembed/1.0/proxy', { params });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get oEmbed proxy data: ${error}`);
        }
    }

    // ==========================================
    // BLOCK EDITOR
    // ==========================================

    /**
     * Get URL details for block editor
     * Returns metadata about a URL for use in blocks (like link previews)
     * @param url The URL to get details for
     */
    async getURLDetails(url: string): Promise<URLDetails> {
        try {
            const response = await this.client.post<URLDetails>('/wp-block-editor/v1/url-details', { url });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get URL details: ${error}`);
        }
    }

    // ==========================================
    // BLOCK DIRECTORY
    // ==========================================

    /**
     * Search the WordPress.org block directory
     * @param term Search term
     * @param page Page number
     * @param perPage Results per page
     */
    async searchBlockDirectory(term: string, page: number = 1, perPage: number = 10): Promise<BlockDirectoryItem[]> {
        try {
            const response = await this.client.get<BlockDirectoryItem[]>('/wp/v2/block-directory/search', {
                params: {
                    term,
                    page,
                    per_page: perPage
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to search block directory: ${error}`);
        }
    }
}

