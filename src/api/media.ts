import { BaseApiClient } from './base-client.js';
import { Media, MediaData, MediaFilters } from '../types/media.js';
import { PaginatedResponse } from '../types/pagination.js';
import FormData from 'form-data';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../types/config.js';

export class MediaApiClient extends BaseApiClient {
    async getMedia(filters?: MediaFilters): Promise<PaginatedResponse<Media[]>> {
        return this.getPaginated<Media[]>('/media', filters);
    }

    async getMediaItem(id: number): Promise<Media> {
        return this.get<Media>(`/media/${id}`);
    }

    async uploadMedia(file: Buffer, filename: string, data?: MediaData): Promise<Media> {
        const formData = new FormData();
        formData.append('file', file, filename);
        
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined) {
                    formData.append(key, String(value));
                }
            });
        }

        try {
            const response = await this.client.post('/media', formData, {
                headers: {
                    ...formData.getHeaders(),
                    'Content-Disposition': `attachment; filename="${filename}"`
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError<ErrorResponse>);
        }
    }

    async updateMedia(id: number, data: Partial<MediaData>): Promise<Media> {
        return this.put<Media>(`/media/${id}`, data);
    }

    async deleteMedia(id: number, force: boolean = false): Promise<void> {
        return this.delete(`/media/${id}${force ? '?force=true' : ''}`);
    }
} 