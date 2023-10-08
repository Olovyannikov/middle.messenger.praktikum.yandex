import type {
    AddUserToChatRequest,
    GetChatsRequest,
} from '@/services/Chats/Chats.dto.ts';
import type { ChatModel } from '@/shared/types/models/Chat';
import { axios } from '@/services/config.ts';
import { ChatUserModel } from '@/shared/types/models/Chat';

class Chats {
    public getChats(params: GetChatsRequest) {
        const offset = params.offset ?? null;
        const limit = params.limit ?? null;
        const title = params.title ?? null;

        const string = () => {
            let res = '';
            if (offset) {
                res += 'offset=' + offset + '&';
            }

            if (limit) {
                res += 'limit=' + limit + '&';
            }

            if (title) {
                res += 'title=' + title + '&';
            }

            return res;
        };

        return axios.get<ChatModel[]>(`/chats/?${string()}`);
    }

    public async createChat(title: string) {
        return await axios.post<string>('/chats', { title });
    }

    public async deleteChat(chatId: string | number) {
        return await axios.delete<string>('/chats', { chatId });
    }

    public async connectToChat(chatId: string | number) {
        return await axios.post<{ token: string }>(`/chats/token/${chatId}`);
    }

    public async getChatUsers(chatId: string | number) {
        return await axios.get<ChatUserModel[]>(`/chats/${chatId}/users`);
    }

    public async addUserToChat(body: AddUserToChatRequest) {
        return await axios.put<AddUserToChatRequest>('/chats/users', body);
    }

    public async removeUserFromChat(body: AddUserToChatRequest) {
        return await axios.delete<AddUserToChatRequest>('/chats/users', body);
    }
}

export const ChatsService = new Chats();