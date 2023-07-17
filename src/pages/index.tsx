import { VDom } from '@/jsx';
import { Link } from '@/shared/ui/Link';
import { Typography } from '@/shared/ui/Typography';

import { linksList } from './config.tsx';
import s from './styles.module.scss';
import { Axios } from '@/shared/lib/axios.ts';

export default function IndexPage() {
    // Пример использования
    const axios = new Axios();

    axios.interceptors.request.use((config) => {
        // Модифицировать конфигурацию перед отправкой запроса
        config.headers = {
            ...config.headers,
            'X-Requested-With': 'XMLHttpRequest',
        };
        return config;
    });

    // TODO: допилить аксиос
    axios
        .get<{
            userId: number;
            id: number;
            title: string;
            completed: boolean;
        }>('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => console.log(res.data));

    axios.interceptors.response.use((response) => {
        // Модифицировать ответ перед его обработкой
        response.data = JSON.parse(response.data);
        return response;
    });

    return (
        <section className={s.links}>
            <Typography className={s.title} variant="h5">
                Список ссылок:
            </Typography>
            <ul>
                {linksList.map((link) => (
                    <li key={link.id}>
                        <Link className={s.link} href={link.route}>
                            <Typography>{link.children}</Typography>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
