import { VDom } from '@/jsx';
import s from './SendMessage.module.scss';
import { useSendNewMessage } from '@/shared/hooks/chats/useSendNewMessage.ts';

export const SendMessage = () => {
    const { isLoading, data, handleSubmit, handleChange } = useSendNewMessage();
    return (
        <form onSubmit={handleSubmit} className={s.chatbar}>
            <input
                className={s.input}
                autofocus
                name="content"
                value={data['content']}
                onInput={handleChange('content')}
                disabled={isLoading}
                placeholder="Сообщение"
            />
            <button className={s.send} type="submit" disabled={isLoading}>
                <img
                    alt="Отправить сообщение"
                    src="/icons/send.svg"
                    width="24"
                    height="24"
                />
            </button>
        </form>
    );
};