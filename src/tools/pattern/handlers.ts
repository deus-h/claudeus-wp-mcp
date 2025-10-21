import { PatternsApiClient } from '../../api/patterns.js';
import { PatternDirectoryFilters } from '../../types/pattern.js';

export async function handlePatternTools(name: string, args: Record<string, unknown>, client: PatternsApiClient) {
    switch (name) {
        case 'claudeus_wp_patterns__get_local': {
            const patterns = await client.getPatterns();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(patterns, null, 2)
                }]
            };
        }
        case 'claudeus_wp_patterns__get_categories': {
            const categories = await client.getPatternCategories();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(categories, null, 2)
                }]
            };
        }
        case 'claudeus_wp_patterns__search_directory': {
            const patterns = await client.searchPatternDirectory(args.filters as PatternDirectoryFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(patterns, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown pattern tool: ${name}`);
    }
}

