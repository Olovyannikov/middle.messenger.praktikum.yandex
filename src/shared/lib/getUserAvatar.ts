import type { ChatUserModel } from '@/shared/types/models/Chat';
import type { ChatMessage } from '@/shared/hooks/chats/useWSMessenger.ts';
import { BASE_URL } from '@/services/config.ts';

export const getUserAvatar = (chat: ChatUserModel[], message: ChatMessage) => {
    const path = chat?.find((el) => el.id === message?.user_id)?.avatar;

    if (path) {
        return `${BASE_URL}/resources/${path}`;
    }

    return '';
};
