/**
 * Prompt handling for WordPress MCP
 * Manages prompt listings and retrieval
 */

import { prompts } from '../prompts/index.js';

/**
 * List all available prompts
 */
export function listPrompts() {
    return {
        prompts: Object.entries(prompts).map(([id, prompt]) => ({
            name: id,
            description: prompt.description,
            arguments: prompt.arguments
        }))
    };
}

/**
 * Get a specific prompt by name
 */
export function getPrompt(promptName: string, args?: Record<string, unknown>) {
    const prompt = prompts[promptName];
    if (!prompt) {
        throw new Error(`Unknown prompt: ${promptName}`);
    }

    return {
        description: prompt.description,
        messages: [
            {
                role: 'assistant',
                content: {
                    type: 'text',
                    text: `I am a WordPress content expert, ready to help you with ${prompt.name}.`
                }
            },
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: `Please help me with ${prompt.name} using these arguments:\n${
                        prompt.arguments.map(arg =>
                            `${arg.name}: ${args?.[arg.name] || '(not provided)'}`
                        ).join('\n')
                    }`
                }
            }
        ]
    };
}

