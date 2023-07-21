import { VDom } from '@/jsx';
import s from './styles.module.scss';

export interface ToastProps {
    id: string;
    destroy: () => void;
    title: string;
    content: string;
    duration?: number;
    key?: number | string;
}

export const Toast = ({
    destroy,
    content,
    title,
    duration = 0,
    id,
}: ToastProps) => {
    if (duration) {
        setTimeout(() => {
            destroy();
        }, duration);
    }

    return (
        <div id={id}>
            <div className={s.header}>
                <div>{title}</div>
            </div>
            <div>{content}</div>
        </div>
    );
};