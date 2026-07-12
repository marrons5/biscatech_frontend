import apiClient from "./apiClient";

export type Role = "customer" | "provider" | "admin";

export interface Address {
    id: string;
    label: string;
    full: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    initials: string;
    status?: string;
    emailVerified?: boolean;
    addresses?: Address[];

    isAvailable?: boolean;
    isVerified?: boolean;
    ratingAvg?: number;
    ratingCount?: number;
}

export type RegisterPayload = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

export type VerifyEmailPayload = {
    email: string;
    code: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type ForgotPasswordPayload = {
    email: string;
};

export type ResetPasswordPayload = {
    email: string;
    code: string;
    password: string;
};

export type RefreshTokenPayload = {
    refreshToken: string;
};

export interface AuthData {
    token: string;
    refreshToken: string;
    user: User;
}

export interface RegisterData {
    message: string;
    user: User;
}

export interface MessageData {
    message: string;
}

export interface RefreshTokenData {
    token: string;
    refreshToken: string;
}

export interface AuthResponse {
    success: boolean;
    data: AuthData;
}

export interface RegisterResponse {
    success: boolean;
    data: RegisterData;
}

export interface MessageResponse {
    success: boolean;
    data: MessageData;
}

export interface RefreshTokenResponse {
    success: boolean;
    data: RefreshTokenData;
}

export interface GetMeResponse {
    success: boolean;
    data: User;
}

export const authService = {
    async register(payload: RegisterPayload) {
        return await apiClient.post<RegisterResponse>("/api/auth/register", payload);
    },

    async verify(payload: VerifyEmailPayload) {
        return await apiClient.post<AuthResponse>("/api/auth/verify", payload);
    },

    async login(payload: LoginPayload) {
        return await apiClient.post<AuthResponse>("/api/auth/login", payload);
    },

    async forgotPassword(payload: ForgotPasswordPayload) {
        return await apiClient.post<MessageResponse>("/api/auth/forgot-password", payload);
    },

    async resetPassword(payload: ResetPasswordPayload) {
        return await apiClient.post<MessageResponse>("/api/auth/reset-password", payload);
    },

    async refresh(payload: RefreshTokenPayload) {
        return await apiClient.post<RefreshTokenResponse>("/api/auth/refresh", payload);
    },

    async logout(payload: RefreshTokenPayload) {
        return await apiClient.post<MessageResponse>("/api/auth/logout", payload);
    },

    async getMe() {
        return await apiClient.get<GetMeResponse>("/api/auth/me");
    },

    async changePassword(payload: { currentPassword: string; newPassword: string }) {
        return await apiClient.post<MessageResponse>("/api/auth/change-password", payload);
    },

    clearSession() {
        apiClient.clearAuthToken();
    },

    isAuthenticated() {
        return !!apiClient.getAuthToken();
    },

    getToken() {
        return apiClient.getAuthToken();
    }
};
