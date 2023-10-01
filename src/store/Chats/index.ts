import { createStore } from '@/jsx';
import { ChatModel } from '@/shared/types/models/Chat';

const initialStore: ChatModel[] = [];

export const [useChatsStore, setChats] = createStore<ChatModel[]>(initialStore);
export const [useChatToken, setChatToken] = createStore<{ token: string }>({
    token: '',
});