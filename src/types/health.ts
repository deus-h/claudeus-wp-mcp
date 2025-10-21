/**
 * WordPress Site Health Types
 * Based on WordPress REST API /wp-site-health/v1 endpoints
 */

/**
 * Site Health Test Result
 */
export interface HealthTestResult {
    /** Test status (good, recommended, critical) */
    status?: 'good' | 'recommended' | 'critical';
    
    /** Test label */
    label?: string;
    
    /** Test description */
    description?: string;
    
    /** Badge color */
    badge?: {
        label?: string;
        color?: string;
    };
    
    /** Actions to take */
    actions?: string;
    
    /** Test passed */
    test?: string;
}

/**
 * Directory Size Information
 */
export interface DirectorySize {
    /** Directory path */
    path?: string;
    
    /** Size in bytes */
    size?: number;
    
    /** Human-readable size */
    size_human?: string;
    
    /** Raw size data */
    raw?: number;
}

/**
 * Directory Sizes Response
 */
export interface DirectorySizes {
    /** WordPress directory size */
    wordpress_size?: DirectorySize;
    
    /** Themes directory size */
    themes_size?: DirectorySize;
    
    /** Plugins directory size */
    plugins_size?: DirectorySize;
    
    /** Uploads directory size */
    uploads_size?: DirectorySize;
    
    /** Database size */
    database_size?: DirectorySize;
    
    /** Total size */
    total_size?: DirectorySize;
}

/**
 * All Site Health Tests Result
 */
export interface AllHealthTests {
    /** Authorization header test */
    authorization_header?: HealthTestResult;
    
    /** Background updates test */
    background_updates?: HealthTestResult;
    
    /** WordPress.org communication test */
    dotorg_communication?: HealthTestResult;
    
    /** HTTPS status test */
    https_status?: HealthTestResult;
    
    /** Loopback requests test */
    loopback_requests?: HealthTestResult;
    
    /** Page cache test */
    page_cache?: HealthTestResult;
}

