import { VDom } from '@/jsx';
import { RootLayout } from '@/layouts';
import { ChatList } from '@/widgets/ChatList/ui';
import { Chat } from '@/widgets/Chat/ui';

import s from './styles.module.scss';

export default function ChatPage() {
    return (
        <RootLayout>
            <section className={s.chat}>
                <ChatList />
                <Chat />
            </section>
        </RootLayout>
    );
}
