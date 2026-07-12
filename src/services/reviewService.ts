import apiClient from "./apiClient";

export type CreateReviewPayload = {
    rating: number;
    tags: string[];
    comment?: string;
};

export type Review = {
    id: string;
    rating: number;
    date: string;
    comment?: string;
    tags: string[];
};

export const reviewService = {
    async create(orderId: string, payload: CreateReviewPayload) {
        return await apiClient.post<{ success: boolean; data: Review }>(`/api/reviews/orders/${orderId}`, payload);
    },

    async list() {
        return await apiClient.get<{ success: boolean; data: Review[] }>("/api/reviews");
    }
};