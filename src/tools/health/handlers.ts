import { HealthApiClient } from '../../api/health.js';

export async function handleHealthTools(name: string, args: Record<string, unknown>, client: HealthApiClient) {
    switch (name) {
        case 'claudeus_wp_health__test_auth': {
            const result = await client.testAuthorizationHeader();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_health__test_background_updates': {
            const result = await client.testBackgroundUpdates();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_health__test_dotorg_communication': {
            const result = await client.testDotOrgCommunication();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_health__test_https': {
            const result = await client.testHttpsStatus();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_health__test_loopback': {
            const result = await client.testLoopbackRequests();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_health__test_page_cache': {
            const result = await client.testPageCache();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_health__get_directory_sizes': {
            const result = await client.getDirectorySizes();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_health__run_all_tests': {
            const result = await client.runAllTests();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown health tool: ${name}`);
    }
}

