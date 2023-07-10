import { VDom } from '@/jsx';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { Input } from '@/shared/ui/Input';
import { ChatUser } from '@/entities/ChatUser/ui';

import { userMock } from '@/widgets/ChatList/ui/mock.ts';
import s from './styles.module.scss';

export const ChatList = () => {
    return (
        <aside className={s.aside}>
            <header className={s.header}>
                <div className={s.top}>
                    <Typography className={s.title}>Чаты</Typography>
                    <Button
                        href="/settings"
                        className={s.settings}
                        variant="info"
                    >
                        <img src="./icons/settings.svg" alt="Настройки" />
                    </Button>
                </div>
                <div className={s.search}>
                    <Input size="small" title="Поиск" />
                </div>
            </header>
            <main>
                <ul>
                    {userMock.map((user) => (
                        <li key={user.id}>
                            <ChatUser
                                chatId={user.chatId}
                                username={user.username}
                                message={user.message}
                                time={user.time}
                                count={user.count}
                            />
                        </li>
                    ))}
                </ul>
            </main>
        </aside>
    );
};
