import { axios } from '@/services/config.ts';
import {
    AuthSignInRequest,
    AuthSignupRequest,
} from '@/services/Auth/Auth.dto.ts';

export class Auth {
    public signup(user: AuthSignupRequest) {
        return axios.post<AuthSignupRequest>('/auth/signup', user);
    }

    public signin(user: AuthSignInRequest) {
        return axios.post('/auth/signin', user);
    }
}

export const AuthService = new Auth();