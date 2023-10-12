import { VDom } from '@/jsx';
import { Typography, Input, Container, Button, Toast } from '@/shared/ui';
import { inputmask } from '@/shared/lib/inputmask.ts';
import { useRegistration } from '@/shared/hooks/useRegistration.ts';
import s from './styles.module.scss';

export const Registration = () => {
    const {
        handleSubmit,
        toasts,
        handleBlur,
        isLoading,
        handleChange,
        errors,
        data,
    } = useRegistration();

    return (
        <>
            <section className={s.registration}>
                <Container className={s.container}>
                    <form className={s.form} onSubmit={handleSubmit}>
                        <Typography className={s.descr}>
                            На данный e-mail мы отправим какой-нибудь смешной
                            мем. Когда-нибудь мы будем отправлять полезные
                            ссылки - QR-код, или пароли какие-то временные, но
                            сейчас просто смешного котика.
                        </Typography>
                        <Input
                            name="first_name"
                            label="Имя"
                            onInput={handleChange('first_name')}
                            error={errors['first_name']}
                            value={data.first_name}
                            onBlur={handleBlur('first_name')}
                        />
                        <Input
                            name="second_name"
                            label="Фамилия"
                            onInput={handleChange('second_name')}
                            error={errors['second_name']}
                            value={data.second_name}
                            onBlur={handleBlur('second_name')}
                        />
                        <Input
                            name="login"
                            label="Логин"
                            onInput={handleChange('login')}
                            error={errors['login']}
                            value={data.login}
                            onBlur={handleBlur('login')}
                        />
                        <Input
                            name="phone"
                            label="Номер телефона"
                            onInput={handleChange('phone')}
                            error={errors['phone']}
                            value={data.phone}
                            onFocus={() => inputmask('[name="phone"]')}
                            onMouseOver={() => inputmask('[name="phone"]')}
                            onKeyDown={() => inputmask('[name="phone"]')}
                            onBlur={handleBlur('phone')}
                        />
                        <Input
                            name="email"
                            label="Электронная почта"
                            type="email"
                            onInput={handleChange('email')}
                            error={errors['email']}
                            value={data.email}
                            onBlur={handleBlur('email')}
                        />
                        <Input
                            name="password"
                            label="Придумайте пароль"
                            type="password"
                            onInput={handleChange('password')}
                            error={errors['password']}
                            value={data.password}
                            onBlur={handleBlur('password')}
                        />
                        <Input
                            name="repeat-password"
                            label="Повторите пароль"
                            type="password"
                            onInput={handleChange('repeat-password')}
                            error={errors['repeat-password']}
                            value={data['repeat-password']}
                            onBlur={handleBlur('repeat-password')}
                        />
                        <Button
                            variant="primary"
                            type="submit"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Зарегистрировться
                        </Button>
                        <Button href="/" variant="text">
                            Уже зарегистрированы?
                        </Button>
                    </form>
                </Container>
            </section>
            <Toast toasts={toasts} position="bottom-right" />
        </>
    );
};