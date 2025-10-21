import { ThemeApiClient } from '../../api/themes.js';
import { ThemeFilters, ThemeCustomizationUpdate } from '../../types/index.js';

export async function handleThemeTools(
    name: string,
    args: Record<string, unknown>,
    client: ThemeApiClient
) {
    switch (name) {
        case 'claudeus_wp_theme__list': {
            const themes = await client.getThemes(args.filters as ThemeFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(themes, null, 2)
                }]
            };
        }
        case 'claudeus_wp_theme__get_active': {
            const theme = await client.getActiveTheme();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(theme, null, 2)
                }]
            };
        }
        case 'claudeus_wp_theme__activate': {
            const theme = await client.activateTheme(args.stylesheet as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(theme, null, 2)
                }]
            };
        }
        case 'claudeus_wp_theme__get_customization': {
            const customization = await client.getThemeCustomization();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(customization, null, 2)
                }]
            };
        }
        case 'claudeus_wp_theme__update_customization': {
            const customization = await client.updateThemeCustomization(args.updates as ThemeCustomizationUpdate);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(customization, null, 2)
                }]
            };
        }
        case 'claudeus_wp_theme__get_custom_css': {
            const css = await client.getCustomCss();
            return {
                content: [{
                    type: "text",
                    text: css
                }]
            };
        }
        case 'claudeus_wp_theme__update_custom_css': {
            await client.updateCustomCss(args.css as string);
            return {
                content: [{
                    type: "text",
                    text: "Custom CSS updated successfully"
                }]
            };
        }
        default:
            throw new Error(`Unknown theme tool: ${name}`);
    }
}

