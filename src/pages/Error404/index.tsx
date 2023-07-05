import {VDom} from "@/jsx";
import s from './styles.module.scss';
import {Button} from "@/shared/ui/Button";

export default function Error404Page() {
    return (
        <div className={s.error}>
            <h1>404</h1>
            <p>Кажется, что-то пошло не так, страница недоступна</p>
            <Button href='/' size='small'>Вернуться назад</Button>
        </div>
    )
}