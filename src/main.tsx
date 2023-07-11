import { render } from '@/jsx';
import { router } from '@/shared/lib/router.ts';

import { App } from './app/App.tsx';

import './app/assets/styles/styles.scss';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLElement;

// ручка для перерендера приложения (например, смена состояний (flux-state) или роутинга)
export function renderView() {
    render(App(), app);
}

// Инициализация роутера
window.addEventListener('popstate', router);
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
