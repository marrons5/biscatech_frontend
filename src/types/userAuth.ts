export type UserRegisterRequest = {
    name: string;
    phone: string;
    password: string;
    email?: string;
}

export type UserRegisterResponse = {
    message: string;
    email: string;
}

export type UserLoginRequest = {
    phone: string;
    password: string;
}

export type UserLoginResponse = {
    accessToken: string;
    user: UserProfile
}