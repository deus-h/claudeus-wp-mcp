import { SiteCapabilities } from '../types/config.js';

/**
 * Check if a specific tool is allowed for a site based on its capabilities configuration
 * @param capabilities The site's capabilities configuration
 * @param toolName The name of the tool to check
 * @returns boolean indicating if the tool is allowed
 */
export function isToolAllowed(capabilities: SiteCapabilities | undefined, toolName: string): boolean {
    // If no capabilities are defined, all tools are allowed by default
    if (!capabilities) {
        return true;
    }

    // Parse the tool name to get the category and operation
    const [prefix, type, operation] = toolName.split('__');
    if (!prefix || !type || !operation) {
        return true; // If we can't parse the tool name properly, allow by default
    }

    // Map tool prefix and type to capability category
    const categoryMap: { [key: string]: { [key: string]: keyof SiteCapabilities } } = {
        'claudeus_wp': {
            'discover': 'discovery',
            'content': type === 'get_posts' || type === 'create_post' || type === 'update_post' || type === 'delete_post' ? 'posts' :
                      type === 'get_pages' || type === 'create_page' || type === 'update_page' || type === 'delete_page' ? 'pages' :
                      type === 'get_blocks' || type === 'create_block' || type === 'update_block' || type === 'delete_block' ? 'blocks' : 'posts',
            'media': 'media',
            'theme': 'themes',
            'shop': 'shop'
        }
    };

    const category = categoryMap['claudeus_wp']?.[type];
    if (!category) {
        return true; // If category is not mapped, allow by default
    }

    const categoryCapabilities = capabilities[category];
    if (!categoryCapabilities) {
        return true; // If category capabilities are not defined, allow by default
    }

    // Check if the specific tool capability is defined
    if (typeof categoryCapabilities === 'object' && categoryCapabilities !== null) {
        const capabilitiesRecord = categoryCapabilities as Record<string, boolean | undefined>;
        const isAllowed = capabilitiesRecord[toolName];
        // If the capability is explicitly set to false, deny access
        if (isAllowed === false) {
            return false;
        }
    }

    // Allow by default if not explicitly denied
    return true;
}

/**
 * Get all allowed tools for a site based on its capabilities configuration
 * @param capabilities The site's capabilities configuration
 * @returns Array of allowed tool names
 */
export function getAllowedTools(capabilities: SiteCapabilities | undefined): string[] {
    if (!capabilities) {
        return []; // Return empty array to indicate all tools are allowed
    }

    const allowedTools: string[] = [];

    // Helper function to process each category
    const processCategory = (category: keyof SiteCapabilities, _prefix: string) => {
        const categoryCapabilities = capabilities[category];
        if (categoryCapabilities) {
            Object.entries(categoryCapabilities).forEach(([tool, isAllowed]) => {
                if (isAllowed !== false) { // If not explicitly false, tool is allowed
                    allowedTools.push(tool);
                }
            });
        }
    };

    // Process each category
    processCategory('discovery', 'claudeus_wp_discover');
    processCategory('posts', 'claudeus_wp_content');
    processCategory('pages', 'claudeus_wp_content');
    processCategory('blocks', 'claudeus_wp_content');
    processCategory('media', 'claudeus_wp_media');
    processCategory('themes', 'claudeus_wp_theme');
    processCategory('shop', 'claudeus_wp_shop');

    return allowedTools;
} 