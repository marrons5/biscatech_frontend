import apiClient from "./apiClient";

export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone: string;
    role?: string;
    photo?: string;
    isVerified: boolean;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    role: "CLIENTE" | "PRESTADOR";
    password: string;
}

export interface LoginCredentials {
    identifier: string;
    password: string;
    role: "CLIENTE" | "PRESTADOR"
}

export interface AuthResponse {
    success: boolean;
    data: {
        user: User;
        token: string;
        message?: string;
    }
}

export const authService = {

    async login(data: LoginCredentials){
        return await apiClient.post<AuthResponse>(`/api/auth/login`, {...data});
    },

    async register(data: RegisterCredentials){
        return await apiClient.post<AuthResponse>("/api/auth/users", {...data});
    },

    async forgotPassword(credentials: { identifier: string}){
        return await apiClient.post<AuthResponse>("/api/auth/forgot-password", {...credentials});
    },

    async resetPassword(credentials: {newPassword: string}){
        return await apiClient.post<AuthResponse>("/api/auth/reset-password", {credentials: credentials.newPassword});
    },

    async verifyEmail(token:  string){
        return await apiClient.post<AuthResponse>("/api/auth/verify-email", {token});
    },

    async verifyPhone(token: string){
        return await apiClient.post<AuthResponse>("/api/auth/verify-phone", {token});
    },
    logout(){
        return  apiClient.clearAuthToken();
    },
    async changePassword(credentials: {currentPassword: string, newPassword: string}){
        return await apiClient.patch<AuthResponse>("/api/auth/change-password", {...credentials});
    },
    async getUserMe(){
        return await apiClient.get<AuthResponse>("/api/auth/users/me")
    },
    async updateProfile(data: Partial<User>){
        return await apiClient.patch<AuthResponse>("/api/auth/users/me", {...data})
    },
}