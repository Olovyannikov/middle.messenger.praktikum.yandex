import { axios } from '@/services/config.ts';
import { UserModel } from '@/shared/types/models/User';

class User {
    public changeUserData(user: UserModel) {
        return axios.put('/user/profile', user);
    }
}

export const UserService = new User();