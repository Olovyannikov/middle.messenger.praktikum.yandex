import { useEffect, useState, VDom } from '@/jsx';

import { setActiveChat, useActiveChat } from '@/store/Chats';

import { Avatar, Typography } from '@/shared/ui';

import { classNames } from '@/shared/lib/clsx.ts';
import { useParams, useLocation } from '@/shared/hooks';

import type { ChatModel } from '@/shared/types/models/Chat';

import s from './ChatsListItem.module.scss';
import { getNormalDate } from '@/shared/lib/getNormalDate/getNormalDate.ts';
import { avatarTitle } from '@/shared/lib/getAvatarTitle.ts';

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

    const chatLastMessageDate = new Date(chat?.last_message?.time);

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
                <Avatar
                    baseUrl="https://ya-praktikum.tech/api/v2/resources/"
                    src={chat?.avatar}
                >
                    {chat?.avatar ? null : avatarTitle(chat?.title)}
                </Avatar>
                <article>
                    <Typography variant="subtitle2">{chat?.title}</Typography>
                    {chat?.last_message ? (
                        <Typography variant="caption" className={s.lastMessage}>
                            {chat?.last_message?.user?.display_name ??
                                chat?.last_message?.user?.first_name}
                            : {chat?.last_message?.content}
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
                        <time dateTime={chat?.last_message?.time}>
                            {getNormalDate(chatLastMessageDate).messageTime}
                        </time>
                    )}
                    {chat?.unread_count ? (
                        <span className={s.count}>{chat?.unread_count}</span>
                    ) : null}
                </span>
            </button>
        </li>
    );
};