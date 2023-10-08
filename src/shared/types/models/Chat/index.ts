import { UserModel } from '@/shared/types/models/User';

export interface ChatModel {
    id: number | string;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: UserModel;
        time: string | Date;
        content: string;
    };
}

export interface ChatUserModel {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    role: string;
}