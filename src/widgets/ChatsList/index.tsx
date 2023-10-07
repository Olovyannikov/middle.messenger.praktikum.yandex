import { VDom } from '@/jsx';
import type { ChatModel } from '@/shared/types/models/Chat';
import { ChatsListItem } from '@/widgets/ChatsList/ui/ChatsListItem';

interface ChatsListProps {
    chats: ChatModel[];
}

export const ChatsList = ({ chats }: ChatsListProps) => {
    return (
        <ul>
            {chats?.map((chat) => <ChatsListItem key={chat.id} chat={chat} />)}
        </ul>
    );
};