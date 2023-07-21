import { VDom } from '@/jsx';
import { Toast, ToastProps } from './Toast';
import s from './styles.module.scss';

interface ToastOptions {
    id?: string;
    title: string;
    content: string;
    duration?: number;
}

export class ToastManager {
    private readonly containerRef: HTMLDivElement;
    private toasts: ToastProps[] = [];

    constructor() {
        const body = document.body;
        const toastContainer = document.createElement('div');
        toastContainer.className = s.container;
        body.insertAdjacentElement('beforeend', toastContainer);
        this.containerRef = toastContainer;
    }

    public show(options: ToastOptions): void {
        const toastId = Math.random().toString(36).substring(2, 9);
        const toast: ToastProps = {
            id: toastId,
            ...options,
            destroy: () => this.destroy(options.id ?? toastId),
        };

        this.toasts = [toast, ...this.toasts];
        this.render();
    }

    public destroy(id: string): void {
        document.getElementById(id)?.remove();
    }

    private render(): void {
        const toastsList = this.toasts.map((toastProps: ToastProps) => (
            <Toast key={toastProps.id} {...toastProps} />
        ));
        toastsList.forEach((toast) => {
            VDom.render(toast, this.containerRef);
        });
    }
}

export const toast = new ToastManager();
