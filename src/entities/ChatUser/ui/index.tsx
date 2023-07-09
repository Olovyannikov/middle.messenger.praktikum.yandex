import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';

import s from './styles.module.scss';
import { Typography } from '@/shared/ui/Typography';
import { useRouter } from '@/shared/hooks/useRouter.ts';
import { addOnClick } from '@/shared/lib/registerEvents.ts';
import { searchParams } from '@/shared/lib/searchParams.ts';
import { Button } from '@/shared/ui/Button';

interface ChatUserProps {
    username: string;
    message: string;
    time: string;
    count: number | string;
    avatarUrl?: string;
    className?: string;
    chatId?: number | string;
}

export const ChatUser = ({
    avatarUrl,
    time,
    count,
    username,
    message,
    className = '',
    chatId,
}: ChatUserProps) => {
    const { location } = useRouter();

    return (
        <article className={classNames(s.item, {}, [className])}>
            <Button href={location + '?chat=' + chatId} className={s.user}>
                <span className={s.avatar}>
                    {avatarUrl && (
                        <img src={avatarUrl} alt={`Пользователь ${username}`} />
                    )}
                </span>
                <div className={s.info}>
                    <Typography variant="subtitle1" className={s.username}>
                        {username}
                    </Typography>
                    <p className={s.message}>{message}</p>
                </div>
                <div className={s.additional}>
                    <time>{time}</time>
                    <span className={s.counter}>{count}</span>
                </div>
            </Button>
        </article>
    );
};
