import { createStore } from '@/jsx';
import type { UserModel } from '@/shared/types/models/User';
import { ChatUserModel } from '@/shared/types/models/Chat';

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

const initialChat: ChatUserModel[] = [
    {
        id: 0,
        first_name: '',
        second_name: '',
        display_name: '',
        login: '',
        avatar: '',
        role: '',
    },
];

export const { use: useUserStore } = createStore(initialStore);
export const { use: useChatUsersStore, set: setChatUsers } =
    createStore(initialChat);