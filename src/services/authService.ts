import apiClient from "./apiClient";

export type Role = "client" | "pro";

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

    // Campos exclusivos do Prestador de Serviços
    isAvailable?: boolean;
    isVerified?: boolean;
    ratingAvg?: number;
    ratingCount?: number;
}

// PAYLOADS

export type RegisterPayload = {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
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

// RESPONSES

export interface AuthResponse {
    success: boolean;
    data: {
        token: string;
        user: User;
    };
}

export interface RegisterResponse {
    success: boolean;
    data: {
        message: string;
        otp?: string;
        user: User;
    };
}

export interface MessageResponse {
    success: boolean;
    data: {
        message: string;
        otp?: string;
    };
}

export interface GetMeResponse {
    success: boolean;
    data: User;
}

// MÉTODOS

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

    async getMe() {
        return await apiClient.get<GetMeResponse>("/api/auth/me");
    },

    logout() {
        apiClient.clearAuthToken();
    },

    isAuthenticated() {
        return !!apiClient.getAuthToken();
    },

    getToken() {
        return apiClient.getAuthToken();
    }
};