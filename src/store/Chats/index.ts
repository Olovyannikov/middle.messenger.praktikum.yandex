import { createStore } from '@/jsx';
import { ChatModel } from '@/shared/types/models/Chat';

const initialStore: ChatModel[] = [];

export const {
    use: useChatsStore,
    update: updateChatStore,
    set: setChats,
} = createStore<ChatModel[]>(initialStore);

export const {
    use: useActiveChat,
    set: setActiveChat,
    update: updateActiveChat,
} = createStore<string | number | null>(null);

export const {
    use: useChatToken,
    set: setChatToken,
    update: updateChatToken,
} = createStore<{ token: string }>({ token: '' });