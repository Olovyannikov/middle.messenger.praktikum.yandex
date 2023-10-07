import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';
import type { ToastItem } from '@/shared/ui/Toast/useToast.ts';
import s from './styles.module.scss';

interface ToastProps {
    toasts: ToastItem[];
    position?: 'bottom-right';
}

export const Toast = ({ toasts, position = 'bottom-right' }: ToastProps) => {
    return (
        <div className={classNames(s.container, {}, [s[position]])}>
            {toasts.map((toast, i) => (
                <div
                    key={i}
                    className={classNames(s.notification, {}, [
                        s.toast,
                        s[position],
                        s[toast.type ?? 'info'],
                    ])}
                >
                    <div>
                        <p className={s.title}>{toast.title}</p>
                        <p className={s.description}>{toast.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
