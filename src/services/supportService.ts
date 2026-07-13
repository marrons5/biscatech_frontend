import apiClient from "./apiClient";
import type { Address } from "./authService";

export type UpdateProfilePayload = {
    name?: string;
    phone?: string;
};

export type AddressPayload = {
    label: "home" | "work" | "other" | string;
    full: string;
};

export type CreateTicketPayload = {
    subject: string;
    message: string;
};

export const supportService = {
    async createTicket(payload: CreateTicketPayload) {
        return await apiClient.post<{ success: boolean; data: { message: string } }>("/api/v1/support/tickets", payload);
    },
};

export const userService = {
    async updateProfile(payload: UpdateProfilePayload) {
        return await apiClient.patch<{ success: boolean; data: { message: string } }>("/api/v1/users/profile", payload);
    },
    async listAddresses() {
        return await apiClient.get<{ success: boolean; data: Address[] }>("/api/v1/users/addresses");
    },
    async createAddress(payload: AddressPayload) {
        return await apiClient.post<{ success: boolean; data: Address }>("/api/v1/users/addresses", payload);
    },
    async updateAddress(id: string, payload: Partial<AddressPayload>) {
        return await apiClient.patch<{ success: boolean; data: Address }>(`/api/v1/users/addresses/${id}`, payload);
    },
    async deleteAddress(id: string) {
        return await apiClient.delete<{ success: boolean; data: { message: string } }>(`/api/v1/users/addresses/${id}`);
    }
};