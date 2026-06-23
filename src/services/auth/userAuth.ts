import { useCreate, useGet } from "../api/apiClient";

import type {
  OtpResendRequest,
  OtpResendResponse,
  OtpVerifyRequest,
  OtpVerifyResponse,
  UseChangePasswordRequest,
  UseChangePasswordResponse,
  UserForgotPasswordRequest,
  UserForgotPasswordResponse,
  UserResetPasswordRequest,
  UserResetPasswordResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterRequest,
  UserRegisterResponse,
  UserResetPasswordReq,
  UserProfile,
} from "@/types/auth";

export function useRegister() {
  return useCreate<UserRegisterResponse, UserRegisterRequest>("/auth/register");
}

export function useLogin() {
  return useCreate<UserLoginResponse, UserLoginRequest>("/auth/login");
}

export function useVerifyOtp() {
  return useCreate<OtpVerifyResponse, OtpVerifyRequest>("/auth/verify-otp");
}

export function useResendOtp() {
  return useCreate<OtpResendResponse, OtpResendRequest>("/auth/resend-otp");
}

export function useForgotPassword() {
  return useCreate<UserForgotPasswordResponse, UserForgotPasswordRequest>(
    "/auth/forgot-password",
  );
}

export function useResetPassword() {
  return useCreate<UserResetPasswordRequest, UserResetPasswordResponse>(
    "/auth/reset-password",
  );
}

export function useChangePassword() {
  return useCreate<UseChangePasswordRequest, UseChangePasswordResponse>(
    "/auth/change-password",
  );
}

export function useResetPasswordWithOtp() {
  return useCreate<UserResetPasswordReq, UserResetPasswordResponse>(
    "/auth/reset-password-otp",
  );
}

export function useCurrentUser() {
  return useGet<UserProfile>({
    key: ["current-user"],
    endpoint: "auth/me",
    enabled: !!localStorage.getItem("auth_token"),
    staleTime: 4000 * 60 * 60,
    retry: false,
  });
}
