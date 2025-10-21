import { WidgetsApiClient } from '../../api/widgets.js';
import { WidgetData, SidebarFilters, WidgetFilters } from '../../types/widget.js';

export async function handleWidgetTools(name: string, args: Record<string, unknown>, client: WidgetsApiClient) {
    switch (name) {
        // ==========================================
        // SIDEBARS
        // ==========================================
        case 'claudeus_wp_widgets__get_sidebars': {
            const sidebars = await client.getSidebars(args.filters as SidebarFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(sidebars, null, 2)
                }]
            };
        }
        case 'claudeus_wp_widgets__get_sidebar': {
            const sidebar = await client.getSidebar(args.id as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(sidebar, null, 2)
                }]
            };
        }
        // ==========================================
        // WIDGETS
        // ==========================================
        case 'claudeus_wp_widgets__get_widgets': {
            const widgets = await client.getWidgets(args.filters as WidgetFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(widgets, null, 2)
                }]
            };
        }
        case 'claudeus_wp_widgets__get_widget': {
            const widget = await client.getWidget(args.id as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(widget, null, 2)
                }]
            };
        }
        case 'claudeus_wp_widgets__create_widget': {
            const widget = await client.createWidget(args.data as WidgetData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(widget, null, 2)
                }]
            };
        }
        case 'claudeus_wp_widgets__update_widget': {
            const widget = await client.updateWidget(
                args.id as string,
                args.data as Partial<WidgetData>
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(widget, null, 2)
                }]
            };
        }
        case 'claudeus_wp_widgets__delete_widget': {
            const result = await client.deleteWidget(
                args.id as string,
                args.force as boolean ?? true
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown widget tool: ${name}`);
    }
}

