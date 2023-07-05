import {render} from "@/jsx";
import {App} from './app/App.tsx';
import {router} from "@/shared/lib/router.ts";

import './app/assets/styles/styles.scss';

const app = document.querySelector<HTMLDivElement>('#app')!

// ручка для перерендера приложения (например, смена состояний (flux-state) или роутинга)
export function renderView() {
    render(
        App(),
        app
    )
}

// первичный рендер приложения при загрузке
renderView();

// Инициализация роутера
window.addEventListener("click", (e: MouseEvent) => {
    if ((e.target as HTMLElement)?.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", (e.target as HTMLAnchorElement).href);
        // форс ререндер для анмаунта компонентов вне роута
        router();
        renderView();
    }
});

window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);