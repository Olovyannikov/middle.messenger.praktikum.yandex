import { useEffect, useState } from '@/jsx';

export interface ToastItem {
    id: number | string;
    title: string;
    description: string;
    type?: 'error' | 'success' | 'warning' | 'info';
}

export const useToast = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const deleteToast = (id: string | number) => {
        const toastListItem = toasts.filter((e) => e.id !== id);
        setToasts(toastListItem);
    };

    const showToast = (toast: ToastItem) => {
        setToasts([...toasts, toast]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (toasts.length) {
                deleteToast(toasts[0].id);
            }
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [toasts, deleteToast]);

    return {
        toasts,
        setToasts,
        deleteToast,
        showToast,
    };
};