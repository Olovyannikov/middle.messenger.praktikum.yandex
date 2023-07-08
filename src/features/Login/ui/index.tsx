import { VDom } from '@/jsx';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import s from './styles.module.scss';

export const Login = () => {
    return (
        <section className={s.login}>
            <Input title="Электронная почта" />
            <Input title="Введите пароль" type="password" />
            <Button variant="primary">Войти</Button>
            <Button variant="text">Забыли пароль?</Button>
        </section>
    );
};
