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

export const userService = {
    async updateProfile(payload: UpdateProfilePayload) {
        return await apiClient.patch<{ success: boolean; data: { message: string } }>("/api/users/profile", payload);
    },
    async listAddresses() {
        return await apiClient.get<{ success: boolean; data: Address[] }>("/api/users/addresses");
    },
    async createAddress(payload: AddressPayload) {
        return await apiClient.post<{ success: boolean; data: Address }>("/api/users/addresses", payload);
    },
    async updateAddress(id: string, payload: Partial<AddressPayload>) {
        return await apiClient.patch<{ success: boolean; data: Address }>(`/api/users/addresses/${id}`, payload);
    },
    async deleteAddress(id: string) {
        return await apiClient.delete<{ success: boolean; data: { message: string } }>(`/api/users/addresses/${id}`);
    }
};