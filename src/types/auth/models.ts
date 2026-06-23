export type UserRegisterRequest = {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export type UserRegisterResponse = {
    message: string;
    email: string;
}

export type UserLoginRequest = {
    email: string;
    password: string;
}

export type UserLoginResponse = {
    accessToken: string;
    user: UserProfile;
}

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    emailVerified: boolean;
    createdAt: string;
}

export type OtpVerifyRequest = {
    email: string;
    code: string;
}

export type OtpVerifyResponse = {
    message: string;
}

export type OtpResendRequest = {
    email: string;
}

export type OtpResendResponse = {
    message: string;
    expiresIn?: number;
}

export type OtpRequest = { 
    email: string;
    code: string;
    newPassword: string;
}

export type UserVerifyEmailResponse = {
    message: string;
}

export type UserForgotPasswordRequest = {
    email: string;
}

export type UserForgotPasswordResponse = {
    message: string;
}

export type UserResetPasswordRequest = {
    token: string;
    newPassword: string;
}

export type UserResetPasswordResponse = {
    message: string;
}

export type UserResetPasswordReq = {
    email: string;
    code: string;
    newPassword: string;
}

export type UseChangePasswordRequest = {
    currentPassword: string;
    newPassword: string;
}

export type UseChangePasswordResponse = {
    message: string;
}

export type ApiError = {
    message: string;
    statusCode?: number;
}