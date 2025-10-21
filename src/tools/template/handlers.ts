import { TemplatesApiClient } from '../../api/templates.js';
import { TemplateData, TemplateFilters } from '../../types/template.js';

export async function handleTemplateTools(name: string, args: Record<string, unknown>, client: TemplatesApiClient) {
    switch (name) {
        // ==========================================
        // TEMPLATES
        // ==========================================
        case 'claudeus_wp_templates__get_templates': {
            const templates = await client.getTemplates(args.filters as TemplateFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(templates, null, 2)
                }]
            };
        }
        case 'claudeus_wp_templates__get_template': {
            const template = await client.getTemplate(args.id as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(template, null, 2)
                }]
            };
        }
        case 'claudeus_wp_templates__create_template': {
            const template = await client.createTemplate(args.data as TemplateData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(template, null, 2)
                }]
            };
        }
        case 'claudeus_wp_templates__update_template': {
            const template = await client.updateTemplate(
                args.id as string,
                args.data as Partial<TemplateData>
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(template, null, 2)
                }]
            };
        }
        case 'claudeus_wp_templates__delete_template': {
            const result = await client.deleteTemplate(
                args.id as string,
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
        // TEMPLATE PARTS
        // ==========================================
        case 'claudeus_wp_templates__get_template_parts': {
            const templateParts = await client.getTemplateParts(args.filters as TemplateFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(templateParts, null, 2)
                }]
            };
        }
        case 'claudeus_wp_templates__get_template_part': {
            const templatePart = await client.getTemplatePart(args.id as string);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(templatePart, null, 2)
                }]
            };
        }
        case 'claudeus_wp_templates__create_template_part': {
            const templatePart = await client.createTemplatePart(args.data as TemplateData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(templatePart, null, 2)
                }]
            };
        }
        case 'claudeus_wp_templates__update_template_part': {
            const templatePart = await client.updateTemplatePart(
                args.id as string,
                args.data as Partial<TemplateData>
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(templatePart, null, 2)
                }]
            };
        }
        case 'claudeus_wp_templates__delete_template_part': {
            const result = await client.deleteTemplatePart(
                args.id as string,
                args.force as boolean || false
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown template tool: ${name}`);
    }
}

