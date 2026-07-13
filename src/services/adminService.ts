import apiClient from "./apiClient";

// --- Users ---
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  createdAt: string;
  providerProfile: { status: string; verified: boolean } | null;
}

export interface ListAdminUsersResponse {
  success: boolean;
  data: AdminUser[] | { users: AdminUser[]; total: number; page: number; totalPages: number };
}

export interface UpdateUserStatusPayload {
  status: "ACTIVE" | "SUSPENDED" | "BANNED" | "PENDING_VERIFICATION";
}

export interface UpdateUserStatusResponse {
  success: boolean;
  data: { message: string };
}

export interface VerifyProResponse {
  success: boolean;
  data: { message: string };
}

// --- Categories ---
export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  services: { id: string; name: string; slug: string; price: string | null }[];
}

export interface ListAdminCategoriesResponse {
  success: boolean;
  data: AdminCategory[];
}

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  slug?: string;
  description?: string;
}

export interface MutateCategoryResponse {
  success: boolean;
  data: AdminCategory;
}

export interface DeleteCategoryResponse {
  success: boolean;
  data: { message: string };
}

// --- Complaints ---
export interface AdminComplaint {
  id: string;
  subject: string;
  description: string;
  status: string;
  customer: { name: string };
  createdAt: string;
}

export interface ListAdminComplaintsResponse {
  success: boolean;
  data: AdminComplaint[];
}

export interface UpdateComplaintStatusPayload {
  status: "OPEN" | "IN_REVIEW" | "RESOLVED" | "DISMISSED";
}

export interface UpdateComplaintStatusResponse {
  success: boolean;
  data: { message: string };
}

// --- Settings ---
export interface AdminSettings {
  commissionRate: number;
}

export interface GetSettingsResponse {
  success: boolean;
  data: AdminSettings;
}

export interface UpdateSettingsPayload {
  commissionRate: number;
}

export interface UpdateSettingsResponse {
  success: boolean;
  data: { message: string };
}

export interface AdminServicePayload {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  type?: "REPAIR" | "INSTALLATION" | "MAINTENANCE" | "EMERGENCY";
  priceMin?: number;
  priceMax?: number;
}

export interface UpdateAdminServicePayload {
  name?: string;
  slug?: string;
  description?: string;
  type?: "REPAIR" | "INSTALLATION" | "MAINTENANCE" | "EMERGENCY";
  priceMin?: number;
  priceMax?: number;
  isActive?: boolean;
}

export interface MutateServiceResponse {
  success: boolean;
  data: { message: string };
}

export const adminService = {
  // Users
  async listUsers() {
    return await apiClient.get<ListAdminUsersResponse>("/api/v1/admin/users");
  },
  async updateUserStatus(id: string, payload: UpdateUserStatusPayload) {
    return await apiClient.patch<UpdateUserStatusResponse>(`/api/v1/admin/users/${id}/status`, payload as any);
  },
  async verifyPro(id: string) {
    return await apiClient.post<VerifyProResponse>(`/api/v1/admin/users/${id}/verify`);
  },

  // Categories
  async listCategories() {
    return await apiClient.get<ListAdminCategoriesResponse>("/api/v1/admin/categories");
  },
  async createCategory(payload: CreateCategoryPayload) {
    return await apiClient.post<MutateCategoryResponse>("/api/v1/admin/categories", payload as any);
  },
  async updateCategory(id: string, payload: UpdateCategoryPayload) {
    return await apiClient.patch<MutateCategoryResponse>(`/api/v1/admin/categories/${id}`, payload as any);
  },
  async deleteCategory(id: string) {
    return await apiClient.delete<DeleteCategoryResponse>(`/api/v1/admin/categories/${id}`);
  },

  // Services
  async createService(payload: AdminServicePayload) {
    return await apiClient.post<MutateServiceResponse>("/api/v1/admin/services", payload as any);
  },
  async updateService(id: string, payload: UpdateAdminServicePayload) {
    return await apiClient.patch<MutateServiceResponse>(`/api/v1/admin/services/${id}`, payload as any);
  },

  // Complaints
  async listComplaints() {
    return await apiClient.get<ListAdminComplaintsResponse>("/api/v1/admin/complaints");
  },
  async updateComplaintStatus(id: string, payload: UpdateComplaintStatusPayload) {
    return await apiClient.patch<UpdateComplaintStatusResponse>(`/api/v1/admin/complaints/${id}`, payload as any);
  },

  // Settings
  async getSettings() {
    return await apiClient.get<GetSettingsResponse>("/api/v1/admin/settings");
  },
  async updateSettings(payload: UpdateSettingsPayload) {
    return await apiClient.patch<UpdateSettingsResponse>("/api/v1/admin/settings", payload as any);
  },
};
