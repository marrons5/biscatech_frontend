import apiClient from "./apiClient";

export interface PredefinedService {
    id: string;
    title: string;
    description: string;
    category: string;
    type: "REPARO" | "MANUTENÇÃO" | "INSTALAÇÃO" | "EMERGÊNCIA";
    price: number;
}

export interface GetCatalogParams {
    category?: string;
    type?: string;
    search?: string;
}

export interface ListCatalogResponse {
    success: boolean;
    data: {
        services: PredefinedService[];
    };
}

export interface GetCatalogDetailsResponse {
    success: boolean;
    data: {
        service: PredefinedService;
    }
}

export const catalogService = {

    async list (params?: GetCatalogParams) {
        return await apiClient.get<ListCatalogResponse>(`/api/services-catalog/`, {...params});
    },

    async getById (id: string) {
        return await apiClient.get<GetCatalogDetailsResponse>(`/api/services-catalog/${id}`);
    }
}