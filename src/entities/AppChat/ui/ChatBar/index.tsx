import { useEffect, VDom } from '@/jsx';
import { SendMessage } from '@/features/SendMessage';
import { useMessageStore } from '@/shared/hooks/chats/useWSMessenger.ts';
import { ChatMessageItem } from '@/entities/ChatMessageItem';
import s from './ChatBar.module.scss';

export const ChatBar = () => {
    const [messages] = useMessageStore();

    useEffect(() => {
        const inputEl =
            document.querySelector<HTMLInputElement>('[name="content"]');
        const chatEl = document.querySelector<HTMLUListElement>('#chatList');

        inputEl?.focus();
        chatEl?.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: chatEl?.scrollHeight,
        });
    }, [messages]);

    return (
        <div className={s.chat}>
            <ul className={s.chatList} id="chatList">
                {messages?.map((message, i) => (
                    <ChatMessageItem
                        key={message.id}
                        message={message}
                        index={i}
                    />
                ))}
            </ul>
            <SendMessage />
        </div>
    );
};