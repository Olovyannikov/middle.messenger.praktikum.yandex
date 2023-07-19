import { VDom } from '@/jsx';
import { Typography } from '@/shared/ui/Typography';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import '../model/controller.ts';
import s from './styles.module.scss';

export const Registration = () => {
    return (
        <form className={s.registration} id="register" name="register">
            <Typography className={s.descr}>
                На данный e-mail мы отправим какой-нибудь смешной мем.
                Когда-нибудь мы будем отправлять полезные ссылки - QR-код, или
                пароли какие-то временные, но сейчас просто смешного котика.
            </Typography>
            <Input name="first_name" title="Имя" />
            <Input name="second_name" title="Фамилия" />
            <Input name="login" title="Логин" />
            <Input name="phone" title="Номер телефона" />
            <Input name="email" title="Электронная почта" type="email" />
            <Input name="password" title="Придумайте пароль" type="password" />
            <Input
                name="repeat-password"
                title="Повторите пароль"
                type="password"
            />
            <Button variant="primary" type="submit">
                Зарегистрировться
            </Button>
            <Button hash href="#login" variant="text">
                Уже зарегистрированы?
            </Button>
        </form>
    );
};