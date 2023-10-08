import { classNames } from '@/shared/lib/clsx.ts';
import { Avatar } from '@/shared/ui';
import { getUserAvatar } from '@/shared/lib/getUserAvatar.ts';
import { avatarTitle } from '@/shared/lib/getAvatarTitle.ts';
import { VDom } from '@/jsx';
import { getNormalDate } from '@/shared/lib/getNormalDate.ts';
import {
    type ChatMessage,
    useMessageStore,
} from '@/shared/hooks/chats/useWSMessenger.ts';
import { useChatUsersStore, useUserStore } from '@/store/User';
import s from './ChatMessageItem.module.scss';

interface ChatMessageItemProps {
    message: ChatMessage;
    index: number;
    key: string | number;
}

export const ChatMessageItem = ({ message, index }: ChatMessageItemProps) => {
    const [chatUsers] = useChatUsersStore();
    const [messages] = useMessageStore();
    const [user] = useUserStore();

    return (
        <li
            key={message?.id}
            className={classNames(s.message, {
                [s.me]: message?.user_id === user.id,
            })}
            style={`margin-bottom: ${
                message?.user_id === messages[index + 1]?.user_id ||
                messages[messages.length - 1]?.id === message?.id
                    ? '8px'
                    : '20px'
            }; margin-bottom: ${
                message?.user_id === messages[index - 1]?.user_id ||
                messages[messages.length - 1]?.id === message?.id
                    ? '8px'
                    : '20px'
            }`}
        >
            {message?.user_id === messages[index - 1]?.user_id ? null : (
                <Avatar
                    className={s.avatar}
                    src={getUserAvatar(chatUsers, message)}
                >
                    {!getUserAvatar(chatUsers, message) &&
                        avatarTitle(
                            chatUsers?.find((el) => el.id === message?.user_id)
                                ?.first_name,
                        )}
                </Avatar>
            )}
            <div className={s.content}>
                <span>{message?.content}</span>
                <time dateTime={message?.time}>
                    {getNormalDate(new Date(message?.time)).messageTime}
                </time>
            </div>
        </li>
    );
};