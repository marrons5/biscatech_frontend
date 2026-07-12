import apiClient from "./apiClient";

export type RequestStatus = "pending" | "accepted" | "in_progress" | "awaiting_confirmation" | "completed" | "cancelled" | "expired";
export type RequestType = "repair" | "installation" | "maintenance" | "emergency";
export type RequestScope = "mine" | "assigned" | "available";

export interface IServiceRequest {
    id: string;
    serviceId?: string;
    title: string;
    description: string;
    location: string;
    date: string;
    status: RequestStatus;
    type: RequestType;
    isCustom: boolean;
    price?: number | null;
    proposedValue?: number | null;
    eta?: string | null;
    expiresAt: string;
    proCompletedAt?: string | null;
    clientConfirmedAt?: string | null;
    photos?: string[];
}

// PAYLOADS

export type CreateServiceRequestPayload = {
    serviceId?: string;
    isCustom?: boolean;
    title: string;
    description: string;
    location: string;
    date: string;
    type?: RequestType;
    stipulatedPrice?: number;
    photos?: string[];
}

export type UpdateServiceRequestPayload = {
    title?: string;
    description?: string;
    location?: string;
    date?: string;
}

export type AcceptServiceRequestPayload = {
    priceAgreed?: number;
    eta?: string;
}

export type ListServiceRequestParams = {
    scope?: RequestScope;
    status?: RequestStatus;
    type?: RequestType;
}

// RESPONSES

export interface SingleRequestResponse {
    success: boolean;
    data: IServiceRequest;
}

export interface ListRequestResponse {
    success: boolean;
    data: IServiceRequest[];
}

export interface StatusUpdateResponse {
    success: boolean;
    data: {
        id: string;
        status: RequestStatus;
    };
}

// MÉTODOS

export const serviceRequestService = {

    async create(payload: CreateServiceRequestPayload) {
        return await apiClient.post<SingleRequestResponse>("/api/v1/service-requests", payload);
    },

    async list(params?: ListServiceRequestParams) {
        return await apiClient.get<ListRequestResponse>("/api/v1/service-requests", params );
    },

    async getById(id: string) {
        return await apiClient.get<SingleRequestResponse>(`/api/service-requests/${id}`);
    },

    async update(id: string, payload: UpdateServiceRequestPayload) {
        return await apiClient.patch<SingleRequestResponse>(`/api/service-requests/${id}`, payload);
    },

    async reactivate(id: string) {
        return await apiClient.post<SingleRequestResponse>(`/api/service-requests/${id}/reactivate`);
    },

    async accept(id: string, payload: AcceptServiceRequestPayload) {
        return await apiClient.post<StatusUpdateResponse>(`/api/service-requests/${id}/accept`, payload);
    },

    async start(id: string) {
        return await apiClient.post<StatusUpdateResponse>(`/api/service-requests/${id}/start`);
    },

    async markCompleted(id: string) {
        return await apiClient.post<StatusUpdateResponse>(`/api/service-requests/${id}/mark-completed`);
    },

    async confirm(id: string) {
        return await apiClient.post<StatusUpdateResponse>(`/api/service-requests/${id}/confirm`);
    },

    async cancelByPro(id: string) {
        return await apiClient.post<StatusUpdateResponse>(`/api/service-requests/${id}/cancel-by-pro`);
    },

    async cancelByClient(id: string) {
        return await apiClient.post<StatusUpdateResponse>(`/api/service-requests/${id}/cancel-by-client`);
    }
};