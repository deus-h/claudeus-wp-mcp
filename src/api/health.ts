/**
 * WordPress Site Health API Client
 * Handles site health checks and diagnostics
 */

import axios, { AxiosInstance } from 'axios';
import { SiteConfig } from '../types/index.js';
import { HealthTestResult, DirectorySizes, AllHealthTests } from '../types/health.js';

export class HealthApiClient {
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
    // SITE HEALTH TESTS
    // ==========================================

    /**
     * Test authorization header
     * Checks if the Authorization header is working correctly
     */
    async testAuthorizationHeader(): Promise<HealthTestResult> {
        try {
            const response = await this.client.get<HealthTestResult>('/wp-site-health/v1/tests/authorization-header');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to test authorization header: ${error}`);
        }
    }

    /**
     * Test background updates
     * Checks if background updates are enabled and working
     */
    async testBackgroundUpdates(): Promise<HealthTestResult> {
        try {
            const response = await this.client.get<HealthTestResult>('/wp-site-health/v1/tests/background-updates');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to test background updates: ${error}`);
        }
    }

    /**
     * Test WordPress.org communication
     * Checks if the site can communicate with WordPress.org
     */
    async testDotOrgCommunication(): Promise<HealthTestResult> {
        try {
            const response = await this.client.get<HealthTestResult>('/wp-site-health/v1/tests/dotorg-communication');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to test WordPress.org communication: ${error}`);
        }
    }

    /**
     * Test HTTPS status
     * Checks if the site is using HTTPS correctly
     */
    async testHttpsStatus(): Promise<HealthTestResult> {
        try {
            const response = await this.client.get<HealthTestResult>('/wp-site-health/v1/tests/https-status');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to test HTTPS status: ${error}`);
        }
    }

    /**
     * Test loopback requests
     * Checks if the site can make requests to itself
     */
    async testLoopbackRequests(): Promise<HealthTestResult> {
        try {
            const response = await this.client.get<HealthTestResult>('/wp-site-health/v1/tests/loopback-requests');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to test loopback requests: ${error}`);
        }
    }

    /**
     * Test page cache
     * Checks if page caching is configured correctly
     */
    async testPageCache(): Promise<HealthTestResult> {
        try {
            const response = await this.client.get<HealthTestResult>('/wp-site-health/v1/tests/page-cache');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to test page cache: ${error}`);
        }
    }

    /**
     * Get directory sizes
     * Returns the size of WordPress directories (themes, plugins, uploads, etc.)
     */
    async getDirectorySizes(): Promise<DirectorySizes> {
        try {
            const response = await this.client.get<DirectorySizes>('/wp-site-health/v1/directory-sizes');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to get directory sizes: ${error}`);
        }
    }

    /**
     * Run all site health tests
     * Executes all available health checks and returns results
     */
    async runAllTests(): Promise<AllHealthTests> {
        const [
            authHeader,
            backgroundUpdates,
            dotorgComm,
            httpsStatus,
            loopback,
            pageCache
        ] = await Promise.all([
            this.testAuthorizationHeader().catch(err => ({ status: 'critical' as const, label: 'Authorization Header Test Failed', description: err.message })),
            this.testBackgroundUpdates().catch(err => ({ status: 'critical' as const, label: 'Background Updates Test Failed', description: err.message })),
            this.testDotOrgCommunication().catch(err => ({ status: 'critical' as const, label: 'WordPress.org Communication Test Failed', description: err.message })),
            this.testHttpsStatus().catch(err => ({ status: 'critical' as const, label: 'HTTPS Test Failed', description: err.message })),
            this.testLoopbackRequests().catch(err => ({ status: 'critical' as const, label: 'Loopback Test Failed', description: err.message })),
            this.testPageCache().catch(err => ({ status: 'critical' as const, label: 'Page Cache Test Failed', description: err.message }))
        ]);

        return {
            authorization_header: authHeader,
            background_updates: backgroundUpdates,
            dotorg_communication: dotorgComm,
            https_status: httpsStatus,
            loopback_requests: loopback,
            page_cache: pageCache
        };
    }
}

