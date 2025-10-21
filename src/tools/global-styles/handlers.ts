import { GlobalStylesApiClient } from '../../api/global-styles.js';
import { GlobalStylesData } from '../../types/global-styles.js';

export async function handleGlobalStylesTools(name: string, args: Record<string, unknown>, client: GlobalStylesApiClient) {
    switch (name) {
        case 'claudeus_wp_global_styles__get': {
            const id = (args.id as string) || 'custom';
            const globalStyles = await client.getGlobalStyles(id);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(globalStyles, null, 2)
                }]
            };
        }
        case 'claudeus_wp_global_styles__update': {
            const id = (args.id as string) || 'custom';
            const globalStyles = await client.updateGlobalStyles(
                id,
                args.data as GlobalStylesData
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(globalStyles, null, 2)
                }]
            };
        }
        case 'claudeus_wp_global_styles__get_theme': {
            const themeStyles = await client.getThemeGlobalStyles(args.stylesheet as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(themeStyles, null, 2)
                }]
            };
        }
        case 'claudeus_wp_global_styles__get_variations': {
            const variations = await client.getStyleVariations(args.stylesheet as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(variations, null, 2)
                }]
            };
        }
        case 'claudeus_wp_global_styles__get_revisions': {
            const revisions = await client.getGlobalStylesRevisions(args.parent_id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(revisions, null, 2)
                }]
            };
        }
        case 'claudeus_wp_global_styles__get_revision': {
            const revision = await client.getGlobalStylesRevision(
                args.parent_id as number,
                args.revision_id as number
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(revision, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown global styles tool: ${name}`);
    }
}

