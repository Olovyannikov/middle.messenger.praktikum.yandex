import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';
import { addOnClick } from '@/shared/lib/registerEvents.ts';
import s from './styles.module.scss';

interface ModalProps {
    open: boolean;
    title?: string;
    showClose?: boolean;
    children?: JSX.Element;
    className?: string;
    id?: string;
    onClose?: () => void;
}

export const Modal = ({
    id = '',
    open = false,
    title,
    showClose = true,
    onClose,
    children,
    className = '',
}: ModalProps) => {
    if (!open) {
        return null;
    }

    addOnClick(id, onClose);

    return (
        <div className={classNames(s.modal, {}, [className])}>
            <button
                hidden={!showClose}
                id={id}
                className={s.close}
                aria-label="Закрыть модальное окно"
            >
                <img
                    width={24}
                    height={24}
                    src="./icons/close-icon.svg"
                    alt="Закрыть модальное окно"
                />
            </button>
            {title && <h2 className={s.title}>{title}</h2>}
            <div>{children}</div>
        </div>
    );
};
