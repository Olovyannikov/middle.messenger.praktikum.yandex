import { VDom } from '@/jsx';
import type { ChatModel } from '@/shared/types/models/Chat';
import { ChatsListItem } from '@/widgets/ChatsList/ui/ChatsListItem';
import s from './ChatList.module.scss';

interface ChatsListProps {
    chats: ChatModel[];
}

export const ChatsList = ({ chats }: ChatsListProps) => {
    if (!chats.length) {
        return (
            <div className={s.empty}>
                <img src="/icons/comments.svg" alt="Добавить новый чат" />
                Чатов пока нет
            </div>
        );
    }

    return (
        <ul>
            {chats?.map((chat) => <ChatsListItem key={chat.id} chat={chat} />)}
        </ul>
    );
};