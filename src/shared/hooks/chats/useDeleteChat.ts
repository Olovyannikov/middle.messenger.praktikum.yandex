import { useState } from '@/jsx';

import { setChats } from '@/store/Chats';
import { ChatsService } from '@/services/Chats/Chats.service.ts';

import { useToast } from '@/shared/ui/Toast/useToast.ts';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';

import type { ChatModel } from '@/shared/types/models/Chat';

interface UseDeleteChatProps {
    chat?: ChatModel;
    cb?: () => void;
}

export const useDeleteChat = ({ chat }: UseDeleteChatProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toasts, showToast } = useToast();
    const handleDeleteChat = async () => {
        setIsLoading(true);
        if (chat?.id) {
            try {
                const res = await ChatsService.deleteChat(chat.id);
                if (res.status === 200) {
                    showToast({
                        id: Date.now(),
                        type: 'success',
                        title: 'Успешно!',
                        description: `Чат ${chat?.title} успешно удален`,
                    });
                    ChatsService.getChats({}).then((res) => setChats(res.data));
                }
            } catch (e: unknown) {
                if (isRMError(e)) {
                    showToast({
                        id: Date.now(),
                        type: 'error',
                        title: 'Ошибка!',
                        description: e?.reason || 'Произошла ошибка',
                    });
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        isLoading,
        toasts,
        handleDeleteChat,
    };
};