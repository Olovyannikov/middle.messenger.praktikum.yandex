import { VDom } from '@/jsx';

import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

import s from './styles.module.scss';

export default function SettingsPage() {
    console.log('page load');

    return (
        <section className={s.settings}>
            <header className={s.header}>
                <Button className={s.back} href="/chats" variant="text">
                    <img
                        src="./icons/back-arrow.svg"
                        alt="Вернуться на страницу чаты"
                    />
                    Изменить личные данные
                </Button>
            </header>
            <main>
                <form>
                    <label className={s.avatar} aria-label="Изменить аватар">
                        <div className={s.image} aria-hidden={true} />
                        <input type="file" />
                    </label>
                    <div className={s.fields}>
                        <Input name="first_name" title="Имя" />
                        <Input name="second_name" title="Фамилия" />
                        <Input name="login" title="Логин" />
                        <Input name="email" title="Почта" />
                        <Input name="phone" title="Телефон" />
                    </div>
                    <Button type="submit">Сохранить</Button>
                </form>
            </main>
        </section>
    );
}
