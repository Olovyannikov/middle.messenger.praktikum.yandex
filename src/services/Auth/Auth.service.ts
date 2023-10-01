import { axios } from '@/services/config.ts';
import {
    AuthSignInRequest,
    AuthSignupRequest,
} from '@/services/Auth/Auth.dto.ts';
import { UserModel } from '@/shared/types/models/User';

class Auth {
    public signup(user: AuthSignupRequest) {
        return axios.post<AuthSignupRequest>('/auth/signup', user);
    }

    public signin(user: AuthSignInRequest) {
        return axios.post('/auth/signin', user);
    }

    public getUser() {
        return axios.get<UserModel>('/auth/user');
    }

    public logout() {
        return axios.post<UserModel>('/auth/logout');
    }
}

export const AuthService = new Auth();