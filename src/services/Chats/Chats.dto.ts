import { ChatModel } from '@/shared/types/models/Chat';

export type GetChatsResponse = ChatModel[];

export interface GetChatsRequest {
    offset?: number;
    limit?: number;
    title?: string;
}

export interface AddUserToChatRequest {
    users: number[];
    chatId: number;
}