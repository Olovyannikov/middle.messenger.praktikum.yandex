import { VDom } from '@/jsx';
import { useUserStore } from '@/store/User';
import { useActiveChat } from '@/store/Chats';
import { ValidatorRequired } from '@/shared/schemas';
import { classNames } from '@/shared/lib/clsx.ts';
import { useForm } from '@/shared/hooks';
import { useWSMessenger } from '@/shared/hooks/chats/useWSMessenger.ts';
import s from './ChatBar.module.scss';

export const ChatBar = () => {
    const [user] = useUserStore();
    const [activeChat] = useActiveChat();
    const { data, handleChange, handleSubmit } = useForm<{ content: string }>({
        validators: {
            content: ValidatorRequired,
        },
        onSubmit: async () => {
            await sendMessage(data.content);
            await getOldMessages();
        },
        initialValues: {
            content: '',
        },
    });

    if (!activeChat) {
        return null;
    }

    const { sendMessage, getOldMessages, messages, isLoading } = useWSMessenger(
        activeChat?.toString(),
    );

    return (
        <div className={s.chat}>
            <ul className={s.chatList}>
                {messages?.map((message) => (
                    <li
                        key={message?.id}
                        className={classNames(s.message, {
                            [s.me]: message?.user_id === user.id,
                        })}
                    >
                        {message?.content}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className={s.chatbar}>
                <input
                    name="content"
                    onInput={handleChange('content')}
                    disabled={isLoading}
                    placeholder="Сообщение"
                />
                <button type="submit" disabled={isLoading}>
                    Send
                </button>
            </form>
        </div>
    );
};