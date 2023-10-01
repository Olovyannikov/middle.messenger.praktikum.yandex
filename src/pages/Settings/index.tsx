import { VDom, useEffect } from '@/jsx';

import { Button, Input, Spin } from '@/shared/ui';

import { useChangeProfile, useForm, useAuth } from '@/shared/hooks';
import { inputmask } from '@/shared/lib/inputmask.ts';

import { AuthService } from '@/services/Auth/Auth.service.ts';

import s from './styles.module.scss';

export default function SettingsPage() {
    const { user, isAuth, isLoading: isUserLoading } = useAuth();

    if (isUserLoading) {
        return <Spin />;
    }

    if (!isAuth) {
        window.location.pathname = '/';
    }

    const {
        value,
        onValueChangeHandler,
        onBlurHandler,
        errors,
        setDefaultValue,
    } = useForm();

    useEffect(() => {
        setDefaultValue('first_name', user?.first_name);
        setDefaultValue('second_name', user?.second_name);
        setDefaultValue('display_name', user?.display_name ?? '');
        setDefaultValue('login', user?.login);
        setDefaultValue('email', user?.email ?? '');
        setDefaultValue('phone', user?.phone ?? '');
    }, [user]);

    const { isLoading, onSubmit, onAvatarChangeHandler } = useChangeProfile();

    const logout = () => {
        AuthService.logout().then(() => {
            window.location.pathname = '/';
        });
    };

    return (
        <section className={s.settings}>
            <header className={s.header}>
                <Button className={s.back} href="/messenger" variant="text">
                    <img
                        src="./icons/back-arrow.svg"
                        alt="Вернуться на страницу чаты"
                    />
                    Изменить личные данные
                </Button>
            </header>
            <main>
                <form className={s.form} onSubmit={onSubmit}>
                    <label className={s.avatar} aria-label="Изменить аватар">
                        {user?.avatar ? (
                            <img
                                className={s.image}
                                alt="Аватар пользователя"
                                src={`https://ya-praktikum.tech/api/v2/resources${user?.avatar}`}
                            />
                        ) : (
                            <div className={s.image} aria-hidden={true} />
                        )}
                        <input
                            type="file"
                            name="avatar"
                            onChange={onAvatarChangeHandler}
                            accept="image/*"
                        />
                    </label>
                    <div className={s.fields}>
                        <Input
                            name="first_name"
                            label="Имя"
                            value={value.first_name}
                            onInput={onValueChangeHandler}
                            onBlur={onBlurHandler}
                        />
                        <Input
                            name="second_name"
                            label="Фамилия"
                            error={errors['second_name']}
                            value={value.second_name}
                            onInput={onValueChangeHandler}
                            onBlur={onBlurHandler}
                        />
                        <Input
                            name="display_name"
                            label="Имя в чате"
                            error={errors['display_name']}
                            value={value.display_name}
                            onInput={onValueChangeHandler}
                            onBlur={onBlurHandler}
                        />
                        <Input
                            name="login"
                            label="Логин"
                            error={errors['login']}
                            value={value.login}
                            onInput={onValueChangeHandler}
                            onBlur={onBlurHandler}
                        />
                        <Input
                            name="email"
                            label="Почта"
                            error={errors['email']}
                            value={value.email}
                            onInput={onValueChangeHandler}
                            onBlur={onBlurHandler}
                        />
                        <Input
                            name="phone"
                            label="Телефон"
                            error={errors['phone']}
                            value={value.phone}
                            onInput={onValueChangeHandler}
                            onBlur={onBlurHandler}
                            onFocus={() => inputmask('[name="phone"]')}
                        />
                    </div>
                    <div className={s.controls}>
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            variant="text"
                            onClick={logout}
                            type="button"
                        >
                            Выйти
                        </Button>
                        <Button
                            loading={isLoading}
                            disabled={isLoading}
                            className={s.save}
                            type="submit"
                        >
                            Сохранить
                        </Button>
                    </div>
                </form>
            </main>
        </section>
    );
}
