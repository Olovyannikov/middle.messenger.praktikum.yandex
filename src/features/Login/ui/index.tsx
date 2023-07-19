import { VDom } from '@/jsx';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import '../model/controller.ts';

import s from './styles.module.scss';

export const Login = () => {
    return (
        <form id="enter" className={s.login}>
            <Input name="login" title="Логин" />
            <Input name="password" title="Введите пароль" type="password" />
            <Button type="submit" variant="primary">
                Войти
            </Button>
        </form>
    );
};
