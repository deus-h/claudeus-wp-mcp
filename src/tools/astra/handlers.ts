import { AstraApiClient } from '../../api/astra.js';
import { AstraMegaMenuData, AstraCustomLayoutData } from '../../types/index.js';

export async function handleAstraTools(
    name: string,
    args: Record<string, unknown>,
    client: AstraApiClient
) {
    switch (name) {
        // ==========================================
        // ASTRA MEGA MENUS
        // ==========================================
        case 'claudeus_wp_astra__get_mega_menu': {
            const megaMenu = await client.getMegaMenu(args.menu_item_id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(megaMenu, null, 2)
                }]
            };
        }
        case 'claudeus_wp_astra__update_mega_menu': {
            const megaMenu = await client.updateMegaMenu(args.data as AstraMegaMenuData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(megaMenu, null, 2)
                }]
            };
        }
        case 'claudeus_wp_astra__enable_mega_menu': {
            const megaMenu = await client.enableMegaMenu(
                args.menu_item_id as number,
                args.columns as number | undefined
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(megaMenu, null, 2)
                }]
            };
        }
        case 'claudeus_wp_astra__disable_mega_menu': {
            const megaMenu = await client.disableMegaMenu(args.menu_item_id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(megaMenu, null, 2)
                }]
            };
        }
        // ==========================================
        // ASTRA CUSTOM LAYOUTS
        // ==========================================
        case 'claudeus_wp_astra__get_custom_layouts': {
            const layouts = await client.getCustomLayouts();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(layouts, null, 2)
                }]
            };
        }
        case 'claudeus_wp_astra__get_custom_layout': {
            const layout = await client.getCustomLayout(args.id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(layout, null, 2)
                }]
            };
        }
        case 'claudeus_wp_astra__create_custom_layout': {
            const layout = await client.createCustomLayout(args.data as AstraCustomLayoutData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(layout, null, 2)
                }]
            };
        }
        case 'claudeus_wp_astra__update_custom_layout': {
            const layout = await client.updateCustomLayout(
                args.id as number,
                args.data as Partial<AstraCustomLayoutData>
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(layout, null, 2)
                }]
            };
        }
        case 'claudeus_wp_astra__delete_custom_layout': {
            const result = await client.deleteCustomLayout(
                args.id as number,
                args.force as boolean || false
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        // ==========================================
        // ASTRA THEME SETTINGS
        // ==========================================
        case 'claudeus_wp_astra__get_settings': {
            const settings = await client.getThemeSettings();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(settings, null, 2)
                }]
            };
        }
        case 'claudeus_wp_astra__update_settings': {
            const settings = await client.updateThemeSettings(args.settings as Record<string, any>);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(settings, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown Astra tool: ${name}`);
    }
}

