import { VDom } from '@/jsx';

import { Button, Input, Spin, Toast } from '@/shared/ui';

import { useChangeProfile, useAuth } from '@/shared/hooks';
import { inputmask } from '@/shared/lib/inputmask.ts';

import s from './styles.module.scss';

export default function SettingsPage() {
    const { isAuth, isLoading: isUserLoading } = useAuth();

    if (isUserLoading) {
        return <Spin />;
    }

    if (!isAuth) {
        window.location.pathname = '/';
    }

    const {
        user,
        isLoading,
        onSubmit,
        logout,
        onAvatarChangeHandler,
        handleChange,
        handleBlur,
        errors,
        data,
        toasts,
    } = useChangeProfile();

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
                            value={data.first_name}
                            onInput={handleChange('first_name')}
                            onBlur={handleBlur('first_name')}
                            error={errors['first_name']}
                        />
                        <Input
                            name="second_name"
                            label="Фамилия"
                            error={errors['second_name']}
                            value={data.second_name}
                            onInput={handleChange('second_name')}
                            onBlur={handleBlur('second_name')}
                        />
                        <Input
                            name="display_name"
                            label="Имя в чате"
                            error={errors['display_name']}
                            value={data.display_name}
                            onInput={handleChange('display_name')}
                            onBlur={handleBlur('display_name')}
                        />
                        <Input
                            name="login"
                            label="Логин"
                            error={errors['login']}
                            value={data.login}
                            onInput={handleChange('login')}
                            onBlur={handleBlur('login')}
                        />
                        <Input
                            name="email"
                            label="Почта"
                            error={errors['email']}
                            value={data.email}
                            onInput={handleChange('email')}
                            onBlur={handleBlur('email')}
                        />
                        <Input
                            name="phone"
                            label="Телефон"
                            error={errors['phone']}
                            value={data.phone}
                            onInput={handleChange('phone')}
                            onBlur={handleBlur('phone')}
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
            {toasts.length > 0 && <Toast toasts={toasts} />}
        </section>
    );
}
