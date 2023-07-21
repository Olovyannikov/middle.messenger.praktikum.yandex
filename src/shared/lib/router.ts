import { renderView } from '@/main.tsx';

export function router() {
    renderView();

    document.querySelectorAll('a[data-link]').forEach((link) => {
        (link as HTMLElement).addEventListener('click', (e: MouseEvent) => {
            if (link) {
                e.preventDefault();
                history.pushState('', '', (link as HTMLAnchorElement).href);
                // форс ререндер для анмаунта компонентов вне роута
                router();
            }
        });
    });
}
