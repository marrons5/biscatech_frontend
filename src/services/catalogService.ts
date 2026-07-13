import apiClient from "./apiClient";

export interface BackendService {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    type: string | null;
    price: string | null;
    priceMin: number | null;
    priceMax: number | null;
}

export interface BackendCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    services: BackendService[];
}

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
    data: BackendCategory[];
}

export interface GetCatalogDetailsResponse {
    success: boolean;
    data: {
        service: BackendService;
    }
}

function flattenCatalog(categories: BackendCategory[]): PredefinedService[] {
    return categories.flatMap((cat) =>
        cat.services.map((svc) => ({
            id: svc.id,
            title: svc.name,
            description: svc.description ?? "",
            category: cat.name,
            type: (svc.type?.toUpperCase() ?? "REPARO") as PredefinedService["type"],
            price: svc.priceMin ?? 0,
        })),
    );
}

export const catalogService = {

    async list (params?: GetCatalogParams) {
        const response = await apiClient.get<ListCatalogResponse>("/api/v1/services", {...params});
        if (response.data?.success && Array.isArray(response.data.data)) {
            return {
                data: {
                    success: true,
                    data: {
                        services: flattenCatalog(response.data.data),
                    },
                },
                status: response.status,
            } as unknown as typeof response;
        }
        return response;
    },

    async getById (id: string) {
        return await apiClient.get<GetCatalogDetailsResponse>(`/api/v1/services/${id}`);
    }
}