import {VDom} from "@/jsx";
import s from './styles.module.scss';
import {Button} from "@/shared/ui/Button";

interface ErrorPageProps {
    status: number | string;
    message?: string;
}

export default function ErrorPage({status, message}: ErrorPageProps) {
    return (
        <div className={s.error}>
            <h1>{status}</h1>
            <p>{message}</p>
            <Button href='/' size='small'>Вернуться назад</Button>
        </div>
    )
}