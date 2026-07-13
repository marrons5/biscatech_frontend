import apiClient from "./apiClient";

export type NotificationType = "order_status" | "new_order" | "review" | "system" | "support";

export type AppNotification = {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    orderId?: string; 
    time: string;     
    isRead: boolean;
};

// RESPONSES
export type ListNotificationsResponse = {
    success: boolean;
    data: AppNotification[];
};

export type MessageResponse = {
    success: boolean;
    data: {
        message: string;
    };
};

// MÉTODOS

export const notificationService = {
    
    async list() {
        return await apiClient.get<ListNotificationsResponse>("/api/v1/notifications");
    },

    async markAsRead(id: string) {
        return await apiClient.patch<MessageResponse>(`/api/v1/notifications/${id}/read`);
    },

    async markAllAsRead() {
        return await apiClient.patch<MessageResponse>("/api/v1/notifications/read-all");
    }
};