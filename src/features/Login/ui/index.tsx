import { VDom } from '@/jsx';

import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { addOnClick } from '@/shared/lib/registerEvents.ts';

import s from './styles.module.scss';

export const Login = () => {
    const onSubmit = (e: MouseEvent) => {
        e.preventDefault();
        console.log('submit');
    };

    addOnClick('enter', onSubmit);

    return (
        <form className={s.login}>
            <Input name="email" title="Электронная почта" />
            <Input name="password" title="Введите пароль" type="password" />
            <Button id="enter" type="submit" variant="primary">
                Войти
            </Button>
            <Button type="button" variant="text">
                Забыли пароль?
            </Button>
        </form>
    );
};
