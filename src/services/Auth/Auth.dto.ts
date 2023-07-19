export interface AuthSignupRequest {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface AuthSignupResponse {
    id: number | string;
}

export interface AuthSignInRequest {
    login: string;
    password: string;
}
