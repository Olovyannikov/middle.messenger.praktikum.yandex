import { VDom } from '@/jsx';

import s from './styles.module.scss';

export const Chat = () => {
    return (
        <main className={s.chat}>
            <div className={s.empty}>
                <img src="./icons/comments.svg" alt="Выберите сообщение" />
                <p>Выберите чат</p>
            </div>
        </main>
    );
};
