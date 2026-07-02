import apiClient from "./apiClient";

export interface AppNotification {
    id: string;
    userId: string;
    title: string;
    message: string;
    isRead: boolean;
    relatedRequestId?: string;
    createdAt: string;
}

export interface GetNotificationParams {
    unreadOnly?: boolean;
    page?: number;
    limit?: number;
}

export interface ListNotificationsResponse {
    success: boolean;
    data: {
        notifications: AppNotification[];
        unreadCount: number;
    }
}

export const notificationService = {
    async list (params?: GetNotificationParams) {
        return await apiClient.get<ListNotificationsResponse>("/api/notifications", {...params});
    },

    async markAsRead (id:string) {
        return await apiClient.patch<AppNotification>(`/api/notifications/${id}/read`);
    },

    async markAllAsRead () {
        return await apiClient.patch("/api/notifications/read-all");
    }
}