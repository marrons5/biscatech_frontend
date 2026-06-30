import apiClient from "./apiClient";

export interface ServiceRequest {
    id: string;
    clientId: string;
    proId?: string
    title: string;
    description: string;
    category: string;
    type: "REPARO" | "MANUTENÇÃO" | "INSTALAÇÃO" | "EMERGÊNCIA";
    location: string;
    scheduledDate: string;
    price: string;
    status: "PENDENTE" | "ACEITE" | "CANCELADA" | "CONCLUÍDA" | "EXPIRADA";
    createdAt: string;
    isCustom: boolean;
}

export interface CreateServiceRequestProps {
    title: string;
    description: string;
    category: string;
    type: "REPARO" | "MANUTENÇÃO" | "INSTALAÇÃO" | "EMERGÊNCIA";
    location: string;
    scheduledDate: string;
    price?: number;
    isCustom: boolean;
}

export interface CreateServiceRequestResponse {
    success: boolean;
    data: {
        request: ServiceRequest;
        message?: string;
    }
}

export interface GetRequestParams {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
}

export interface ListServiceRequestsResponse {
    success: boolean;
    data: {
        requests: ServiceRequest[];
        total: number;
    }
}

export interface GetServiceRequestDetailsResponse {
    success: boolean;
    data: {
        request: ServiceRequest;
    }
}

export interface CompleteAndRateRequestProps {
    status: string;
    rating: number;
    comment?: string;
} 

export interface ChangeServiceRequestStatusProps {
    proId?: string;
    status: string;
}

export interface ChangeServiceRequestStatusResponse {
    success: boolean;
    data: {
        proId?: string;
        status: string;
        message?: string;
    }
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
}