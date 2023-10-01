import { useEffect, VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';
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

    const onCloseByEscape = (e: KeyboardEvent) => {
        if (onClose && e.key === 'Escape') {
            onClose();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', onCloseByEscape);

        return () => document.removeEventListener('keydown', onCloseByEscape);
    }, []);

    return (
        <div>
            <div className={s.open} />
            <div className={classNames(s.modal, {}, [className])}>
                <button
                    hidden={!showClose}
                    onClick={onClose}
                    className={s.close}
                    aria-label="Закрыть модальное окно"
                >
                    <img
                        width="24"
                        height="24"
                        src="./icons/close-icon.svg"
                        alt="Закрыть модальное окно"
                    />
                </button>
                {title && <h2 className={s.title}>{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
};
