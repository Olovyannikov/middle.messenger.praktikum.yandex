import { useChatsStore } from '@/store/Chats';
import { useEffect } from '@/jsx';
import { ChatsService } from '@/services/Chats/Chats.service.ts';

export const useGetAllChats = () => {
    const [chats, { set }] = useChatsStore();

    useEffect(() => {
        ChatsService.getChats({}).then((res) => set(res.data));
    }, []);

    return {
        chats,
    };
};