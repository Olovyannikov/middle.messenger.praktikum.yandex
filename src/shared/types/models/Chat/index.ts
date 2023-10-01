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