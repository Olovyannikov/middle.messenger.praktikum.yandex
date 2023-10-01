import { createStore } from '@/jsx';
import type { UserModel } from '@/shared/types/models/User';

const initialStore: UserModel = {
    id: '',
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    avatar: '',
    phone: '',
    email: '',
};

export const { use: useUserStore } = createStore(initialStore);
