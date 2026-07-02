import apiClient from "./apiClient";

interface ServiceRequest {
    id: string;
    clientId: string;
    proId: string | null;
    serviceId: string | null;
    title: string;
    description: string;
    type: "REPARO" | "MANUTENÇÃO" | "INSTALAÇÃO" | "EMERGÊNCIA";
    location: string;
    scheduledDate: string;
    stipulatedPrice: number | null;
    proposedValue: number | null;
    priceAgreed: number | null;
    eta: string | null;
    status: "pending" | "ACEITE" | "CANCELADA" | "CONCLUÍDA" | "EXPIRADA";
    createdAt: Date | null;
    updatedAt: Date | null;
    expiresAt: Date | null;
    proCompletedAt: Date | null;
    clientConfirmedAt: Date | null;
    reactivedFromId: string | null;
    isCustom: boolean;
}

interface CreateServiceRequestRequest {
    serviceId?: string;
    title: string;
    description: string;
    location: string;
    type: "repair" | "maintenance" | "installation" | "emergency";
    date: string;
    stipulatedPrice?: number;
    photos?: string[];
    isCustom?: boolean;
}

interface CreateServiceRequestResponse {
    success: boolean;
    data: {
        serviceRequest: CreateServiceRequestRequest;
        message: string;
    }
}

interface ListServiceRequestsRequest {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    status: string;
    type: "repair" | "installation" | "maintenance" | "emergency";
    price: number
    proposedValue: number;
    eta: string;
    isCustom?: boolean;
    expiresAt: string;
    proCompletedAt: string;
    clientConfirmedAt: string;
}

interface ListServiceRequestsResponse {
    success: boolean;
    data: ListServiceRequestsRequest[];
}

interface ReactivateServiceRequestRequest {
    
}

interface CreateServiceRequestProps {
    title: string;
    description: string;
    category: string;
    type: "REPARO" | "MANUTENÇÃO" | "INSTALAÇÃO" | "EMERGÊNCIA";
    location: string;
    scheduledDate: string;
    stipulatedPrice?: number;
    isCustom: boolean;
}

interface GetRequestParams {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
}

interface GetServiceRequestDetailsResponse {
    success: boolean;
    data: {
        request: ServiceRequest;
    }
}

interface CompleteAndRateRequestProps {
    status: string;
    rating: number;
    comment?: string;
} 

interface ChangeServiceRequestStatusProps {
    proId?: string;
    status: string;
}

interface ChangeServiceRequestStatusResponse {
    success: boolean;
    data: {
        proId?: string;
        status: string;
        message?: string;
    }
}


interface ListServiceRequestsQueryParams {
    scope: "mine" | "assigned" | "available";
    status: "pending" | "accepted" | "in_progress" | "awaiting_confirmation" | "completed" | "cancelled" | "expired";
    type: "repair" | "installation" | "maintenance" | "emergency";
}


interface GetServiceRequestDetailsRequest {

}

interface AcceptServiceRequestRequest {
    priceAgreed: number;
    eta: string;
}

interface AcceptServiceRequestResponse {
    success: boolean;
    data: {
        id: string;
        status: "ACEITE"
    };
}

export const serviceRequestService = {
    async create(data: CreateServiceRequestProps){
        return await apiClient.post<CreateServiceRequestResponse>("/api/service-requests", {...data});
    },

    async list(params?: GetRequestParams){
        return await apiClient.get<ListServiceRequestsResponse>("/api/service-requests", {...params});
    },

    async getById(id: string){
        return await apiClient.get<GetServiceRequestDetailsResponse>(`/api/service-requests/${id}`);
    },

    async update(id:string, data: Partial<CreateServiceRequestProps>){
        return await apiClient.patch<GetServiceRequestDetailsResponse>(`/api/service-requests/${id}`, {...data});
    },

    async changeStatus(id:string, data: ChangeServiceRequestStatusProps){
        return await apiClient.patch<ChangeServiceRequestStatusResponse>(`/api/service-requests/${id}/status`, {...data});
    },

    async completeAndRate(id: string, data: CompleteAndRateRequestProps){
        return await apiClient.patch<ChangeServiceRequestStatusResponse>(`/api/service-requests/${id}/complete`, {...data});
    },

    async accept(id: string, data: AcceptServiceRequestRequest){
        return apiClient.post<AcceptServiceRequestResponse>(`/api/service-requests/${id}/accept`, {...data});
    },

    async reactivate () {
        return await apiClient.post
    }
}