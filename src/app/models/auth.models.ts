export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullname: string,
    username: string,
    email: string,
    phone: string,
    usertype: string,
    password: string,
    confirmPassword: string
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    usertype: string;
}

export interface JwtPayload {
    id: string,
    role: 'customer' | 'admin',
    iat: number,
    exp: number
}

export interface RegisterResponse {
    status: number;
    message: string;
}