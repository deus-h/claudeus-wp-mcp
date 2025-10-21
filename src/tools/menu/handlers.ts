import { MenusApiClient } from '../../api/menus.js';
import { MenuFilters, MenuData, MenuItemFilters, MenuItemData } from '../../types/index.js';

export async function handleMenuTools(
    name: string,
    args: Record<string, unknown>,
    client: MenusApiClient
) {
    switch (name) {
        // ==========================================
        // MENUS CRUD
        // ==========================================
        case 'claudeus_wp_menus__get_menus': {
            const menus = await client.getMenus(args.filters as MenuFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(menus, null, 2)
                }]
            };
        }
        case 'claudeus_wp_menus__get_menu': {
            const menu = await client.getMenu(args.id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(menu, null, 2)
                }]
            };
        }
        case 'claudeus_wp_menus__create_menu': {
            const menu = await client.createMenu(args.data as MenuData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(menu, null, 2)
                }]
            };
        }
        case 'claudeus_wp_menus__update_menu': {
            const menu = await client.updateMenu(
                args.id as number,
                args.data as Partial<MenuData>
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(menu, null, 2)
                }]
            };
        }
        case 'claudeus_wp_menus__delete_menu': {
            const result = await client.deleteMenu(
                args.id as number,
                args.force as boolean
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        // ==========================================
        // MENU ITEMS CRUD
        // ==========================================
        case 'claudeus_wp_menus__get_menu_items': {
            const menuItems = await client.getMenuItems(args.filters as MenuItemFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(menuItems, null, 2)
                }]
            };
        }
        case 'claudeus_wp_menus__create_menu_item': {
            const menuItem = await client.createMenuItem(args.data as MenuItemData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(menuItem, null, 2)
                }]
            };
        }
        case 'claudeus_wp_menus__update_menu_item': {
            const menuItem = await client.updateMenuItem(
                args.id as number,
                args.data as Partial<MenuItemData>
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(menuItem, null, 2)
                }]
            };
        }
        case 'claudeus_wp_menus__delete_menu_item': {
            const result = await client.deleteMenuItem(
                args.id as number,
                args.force as boolean
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        // ==========================================
        // MENU LOCATIONS
        // ==========================================
        case 'claudeus_wp_menus__get_locations': {
            const locations = await client.getMenuLocations();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(locations, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown menu tool: ${name}`);
    }
}

