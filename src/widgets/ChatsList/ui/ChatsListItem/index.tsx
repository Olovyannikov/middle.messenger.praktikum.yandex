import { useEffect, useState, VDom } from '@/jsx';
import type { ChatModel } from '@/shared/types/models/Chat';
import { Avatar, Typography } from '@/shared/ui';
import { setActiveChat, useActiveChat } from '@/store/Chats';
import { useParams } from '@/shared/hooks';
import { classNames } from '@/shared/lib/clsx.ts';
import { useLocation } from '@/shared/hooks/useLocation.ts';
import s from './ChatsListItem.module.scss';

interface ChatsListItemProps {
    key: string | number;
    chat: ChatModel;
}

export const ChatsListItem = ({ chat }: ChatsListItemProps) => {
    const [activeChat] = useActiveChat();
    const { setParams } = useParams();
    const { search } = useLocation();
    const [current, setCurrent] = useState(search?.replaceAll('?chat=', ''));

    useEffect(() => {
        setCurrent(search?.replaceAll('?chat=', ''));
        setParams({
            chat: activeChat?.toString() ?? '',
        });
    }, [search, activeChat]);

    useEffect(() => {
        if (current) {
            setActiveChat(Number(current));
        }
    }, []);

    const avatarTitle =
        chat?.title.split(' ')[0][0] + (chat?.title.split(' ')[1]?.[0] ?? '');

    return (
        <li
            className={classNames(s.item, {
                [s.active]: activeChat === chat?.id,
            })}
        >
            <button
                className={s.btn}
                onClick={() => {
                    if (activeChat === chat?.id) {
                        return;
                    }

                    setActiveChat(chat?.id);
                }}
            >
                <Avatar src={chat?.avatar}>{avatarTitle}</Avatar>
                <article>
                    <Typography variant="subtitle2">{chat?.title}</Typography>
                    {chat?.last_message ? (
                        <Typography variant="caption" className={s.lastMessage}>
                            {chat?.last_message?.user}:{' '}
                            {chat?.last_message?.content}
                        </Typography>
                    ) : (
                        <Typography
                            className={s.lastMessage}
                            variant="caption"
                            as="i"
                        >
                            Нет сообщений
                        </Typography>
                    )}
                </article>
                <span className={s.info}>
                    {chat?.last_message?.time && (
                        <time datetime={chat?.last_message?.time}>99:99</time>
                    )}
                    {chat?.unread_count ? (
                        <span className={s.count}>{chat?.unread_count}</span>
                    ) : null}
                </span>
            </button>
        </li>
    );
};