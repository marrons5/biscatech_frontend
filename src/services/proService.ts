import apiClient from "./apiClient";

export interface ProSkill {
  id: string;
  name: string;
}

export interface ProLanguage {
  id: string;
  language: string;
}

export interface ProZone {
  id: string;
  zone: string;
}

export interface ProDocument {
  id: string;
  name: string;
  fileUrl: string;
  status: string;
  uploadedAt: string;
}

export interface ProProfile {
  id: string;
  userId: string;
  status: string;
  bio: string | null;
  experienceYears: number;
  verified: boolean;
  available: boolean;
  online: boolean;
  ratingAverage: number;
  ratingCount: number;
  completedServices: number;
  acceptanceRate: number;
  user: {
    name: string;
    email: string;
    phone: string;
    initials: string;
  };
  skills: ProSkill[];
  languages: ProLanguage[];
  zones: ProZone[];
  documents: ProDocument[];
}

export interface AvailabilitySlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export type UpdateProProfilePayload = {
  bio?: string;
  experienceYears?: number;
  skills?: string[];
  languages?: string[];
  zones?: string[];
};

export type UpdateAvailabilityPayload = {
  slots: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
};

export interface GetProfileResponse {
  success: boolean;
  data: ProProfile;
}

export interface UpdateProfileResponse {
  success: boolean;
  data: { message: string };
}

export interface GetAvailabilityResponse {
  success: boolean;
  data: AvailabilitySlot[];
}

export interface UpdateAvailabilityResponse {
  success: boolean;
  data: AvailabilitySlot[];
}

export const proService = {
  async getProfile() {
    return await apiClient.get<GetProfileResponse>("/api/v1/pro/profile");
  },

  async updateProfile(payload: UpdateProProfilePayload) {
    return await apiClient.patch<UpdateProfileResponse>("/api/v1/pro/profile", payload);
  },

  async getAvailability() {
    return await apiClient.get<GetAvailabilityResponse>("/api/v1/pro/availability");
  },

  async updateAvailability(payload: UpdateAvailabilityPayload) {
    return await apiClient.put<UpdateAvailabilityResponse>("/api/v1/pro/availability", payload);
  },
};
