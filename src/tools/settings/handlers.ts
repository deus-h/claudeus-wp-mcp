import { SettingsApiClient } from '../../api/settings.js';
import { SiteSettingsData } from '../../types/settings.js';

export async function handleSettingsTools(name: string, args: Record<string, unknown>, client: SettingsApiClient) {
    switch (name) {
        case 'claudeus_wp_settings__get': {
            const settings = await client.getSettings();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(settings, null, 2)
                }]
            };
        }
        case 'claudeus_wp_settings__update': {
            const settings = await client.updateSettings(args.data as SiteSettingsData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(settings, null, 2)
                }]
            };
        }
        case 'claudeus_wp_settings__get_post_types': {
            const postTypes = await client.getPostTypes();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(postTypes, null, 2)
                }]
            };
        }
        case 'claudeus_wp_settings__get_post_type': {
            const postType = await client.getPostType(args.type as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(postType, null, 2)
                }]
            };
        }
        case 'claudeus_wp_settings__get_post_statuses': {
            const statuses = await client.getPostStatuses();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(statuses, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown settings tool: ${name}`);
    }
}

