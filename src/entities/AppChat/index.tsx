import { VDom } from '@/jsx';
import { useActiveChat } from '@/store/Chats';
import { Typography } from '@/shared/ui';

import { Header } from '@/entities/AppChat/ui/Header';
import { ChatBar } from '@/entities/AppChat/ui/ChatBar';
import s from './AppChat.module.scss';

export const AppChat = () => {
    const [activeChat] = useActiveChat();

    if (!activeChat) {
        return null;
    }

    if (!activeChat) {
        return (
            <div className={s.empty}>
                <img src="/icons/comments.svg" alt="Выберите чат" />
                <Typography>Выберите чат</Typography>
            </div>
        );
    }

    return (
        <section className={s.chat}>
            <Header />
            <ChatBar />
        </section>
    );
};