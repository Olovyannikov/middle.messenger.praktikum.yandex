import type {
    AddUserToChatRequest,
    GetChatsRequest,
} from '@/services/Chats/Chats.dto.ts';
import type { ChatModel } from '@/shared/types/models/Chat';
import { axios } from '@/services/config.ts';

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

    public async addUserToChat(body: AddUserToChatRequest) {
        return await axios.put<AddUserToChatRequest>('/chats/users', body);
    }

    public async getChatToken(chatId: string) {
        return await axios.post<{ token: string }>(`/chats/token/${chatId}`);
    }
}

export const ChatsService = new Chats();