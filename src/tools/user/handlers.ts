import { UsersApiClient } from '../../api/users.js';
import { UserFilters, UserData, ApplicationPasswordData } from '../../types/index.js';

export async function handleUserTools(
    name: string,
    args: Record<string, unknown>,
    client: UsersApiClient
) {
    switch (name) {
        // ==========================================
        // USERS CRUD
        // ==========================================
        case 'claudeus_wp_users__get_users': {
            const users = await client.getUsers(args.filters as UserFilters);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(users, null, 2)
                }]
            };
        }
        case 'claudeus_wp_users__get_user': {
            const user = await client.getUser(args.id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(user, null, 2)
                }]
            };
        }
        case 'claudeus_wp_users__get_me': {
            const user = await client.getCurrentUser();
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(user, null, 2)
                }]
            };
        }
        case 'claudeus_wp_users__create_user': {
            const user = await client.createUser(args.data as UserData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(user, null, 2)
                }]
            };
        }
        case 'claudeus_wp_users__update_user': {
            const user = await client.updateUser(args.id as number, args.data as Partial<UserData>);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(user, null, 2)
                }]
            };
        }
        case 'claudeus_wp_users__delete_user': {
            const result = await client.deleteUser(
                args.id as number,
                args.force as boolean,
                args.reassign as number | undefined
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        // ==========================================
        // APPLICATION PASSWORDS
        // ==========================================
        case 'claudeus_wp_users__create_app_password': {
            const password = await client.createApplicationPassword(
                args.user_id as number,
                args.data as ApplicationPasswordData
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(password, null, 2)
                }]
            };
        }
        case 'claudeus_wp_users__list_app_passwords': {
            const passwords = await client.getApplicationPasswords(args.user_id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(passwords, null, 2)
                }]
            };
        }
        case 'claudeus_wp_users__revoke_app_password': {
            const result = await client.deleteApplicationPassword(
                args.user_id as number,
                args.uuid as string
            );
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        case 'claudeus_wp_users__introspect_password': {
            const result = await client.introspectApplicationPassword(args.user_id as number);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(result, null, 2)
                }]
            };
        }
        default:
            throw new Error(`Unknown user tool: ${name}`);
    }
}

