import apiClient from "./apiClient";

export interface MonthlyEarning {
    month: string;
    earnings: number;
}

export interface ServicesByType {
    type: "REPARO" | "MANUTENÇÃO" | "INSTALAÇÃO" | "EMERGÊNCIA";
    count: number;
}

export interface ProStatsSummary {
    obtainedEarnings: number;
    potentialEarnings: number;
    completedServicesCount: number;
    canceledServicesCount: number;
}

export interface GetProStatsResponse {
    success: boolean;
    data: {
        summary: ProStatsSummary;
        earningsChart: MonthlyEarning[];
        servicesByTypeChart: ServicesByType[];
    };
}

export interface GetStatsParams {
    year?: number;
}

export const statsService = {
    async getProStats(params?: GetStatsParams) {
        return await apiClient.get<GetProStatsResponse>("/api/stats/pro", {...params})
    }
}