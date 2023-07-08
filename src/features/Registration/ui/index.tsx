import { VDom } from '@/jsx';
import { Typography } from '@/shared/ui/Typography';

import s from './styles.module.scss';

export const Registration = () => {
    return (
        <section className={s.registration}>
            <Typography className={s.descr}>
                На данный e-mail мы отправим какой-нибудь смешной мем.
                Когда-нибудь мы будем отправлять полезные ссылки - QR-код, или
                пароли какие-то временные, но сейчас просто смешного котика.
            </Typography>
        </section>
    );
};
