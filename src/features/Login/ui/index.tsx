import { VDom } from '@/jsx';
import { Input, Button } from '@/shared/ui';

import { useLogin } from '@/shared/hooks';
import { Toast } from '@/shared/ui/Toast/Toast.tsx';
import s from './styles.module.scss';

export const Login = () => {
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        data,
        errors,
        isLoading,
        toasts,
    } = useLogin();

    return (
        <>
            <form onSubmit={handleSubmit} className={s.login}>
                <Input
                    label="Логин"
                    name="login"
                    error={errors.login}
                    onInput={handleChange('login')}
                    value={data.login}
                    onBlur={handleBlur('login')}
                />
                <Input
                    name="password"
                    label="Введите пароль"
                    type="password"
                    error={errors.password}
                    onInput={handleChange('password')}
                    value={data.password}
                    onBlur={handleBlur('password')}
                />
                <Button
                    loading={isLoading}
                    disabled={isLoading}
                    type="submit"
                    variant="primary"
                >
                    Войти
                </Button>
                <Button href="/sign-up" type="button" variant="text">
                    Зарегистрироваться
                </Button>
            </form>
            <Toast toasts={toasts} position="bottom-right" />
        </>
    );
};

