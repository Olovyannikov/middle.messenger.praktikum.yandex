import { VDom } from '@/jsx';
import { Link } from '@/shared/ui/Link';
import { Typography } from '@/shared/ui/Typography';
import { linksList } from './config.tsx';
import s from './styles.module.scss';

export default function IndexPage() {
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
