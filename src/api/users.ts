/**
 * WordPress Users API Client
 * Handles users, authentication, and application passwords
 */

import { BaseApiClient } from './base-client.js';
import { PaginatedResponse } from '../types/pagination.js';
import {
    User,
    UserData,
    UserFilters,
    ApplicationPassword,
    ApplicationPasswordData,
    ApplicationPasswordIntrospection
} from '../types/user.js';

export class UsersApiClient extends BaseApiClient {
    // ==========================================
    // USERS CRUD
    // ==========================================

    /**
     * Get a list of users with pagination metadata
     */
    async getUsers(filters?: UserFilters): Promise<PaginatedResponse<User[]>> {
        return this.getPaginated<User[]>('/users', filters);
    }

    /**
     * Get a single user by ID
     */
    async getUser(id: number): Promise<User> {
        return this.get<User>(`/users/${id}`);
    }

    /**
     * Get the current authenticated user
     */
    async getCurrentUser(): Promise<User> {
        return this.get<User>('/users/me');
    }

    /**
     * Create a new user
     */
    async createUser(data: UserData): Promise<User> {
        return this.post<User>('/users', data);
    }

    /**
     * Update an existing user
     */
    async updateUser(id: number, data: Partial<UserData>): Promise<User> {
        return this.put<User>(`/users/${id}`, data);
    }

    /**
     * Delete a user
     * @param id User ID
     * @param force Whether to bypass trash and force deletion
     * @param reassign Reassign the deleted user's posts and links to this user ID
     */
    async deleteUser(
        id: number,
        force: boolean = false,
        reassign?: number
    ): Promise<{ deleted: boolean; previous: User }> {
        const params: Record<string, string> = {};
        if (force) params.force = 'true';
        if (reassign !== undefined) params.reassign = String(reassign);
        
        const queryString = new URLSearchParams(params).toString();
        const endpoint = `/users/${id}${queryString ? `?${queryString}` : ''}`;
        
        return this.delete<{ deleted: boolean; previous: User }>(endpoint);
    }

    // ==========================================
    // APPLICATION PASSWORDS
    // ==========================================

    /**
     * Get all application passwords for a user
     */
    async getApplicationPasswords(userId: number): Promise<ApplicationPassword[]> {
        return this.get<ApplicationPassword[]>(`/users/${userId}/application-passwords`);
    }

    /**
     * Create a new application password for a user
     */
    async createApplicationPassword(
        userId: number,
        data: ApplicationPasswordData
    ): Promise<ApplicationPassword & { password: string }> {
        return this.post<ApplicationPassword & { password: string }>(
            `/users/${userId}/application-passwords`,
            data
        );
    }

    /**
     * Get a specific application password
     */
    async getApplicationPassword(userId: number, uuid: string): Promise<ApplicationPassword> {
        return this.get<ApplicationPassword>(`/users/${userId}/application-passwords/${uuid}`);
    }

    /**
     * Update an application password
     */
    async updateApplicationPassword(
        userId: number,
        uuid: string,
        data: Partial<ApplicationPasswordData>
    ): Promise<ApplicationPassword> {
        return this.put<ApplicationPassword>(
            `/users/${userId}/application-passwords/${uuid}`,
            data
        );
    }

    /**
     * Delete (revoke) an application password
     */
    async deleteApplicationPassword(
        userId: number,
        uuid: string
    ): Promise<{ deleted: boolean; previous: ApplicationPassword }> {
        return this.delete<{ deleted: boolean; previous: ApplicationPassword }>(
            `/users/${userId}/application-passwords/${uuid}`
        );
    }

    /**
     * Introspect (validate) the current application password
     * This endpoint uses the application password in the Authorization header
     */
    async introspectApplicationPassword(userId: number): Promise<ApplicationPasswordIntrospection> {
        return this.get<ApplicationPasswordIntrospection>(
            `/users/${userId}/application-passwords/introspect`
        );
    }
}

