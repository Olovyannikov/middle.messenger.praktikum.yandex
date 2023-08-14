import { VDom } from '@/jsx/index.ts';
import { render } from '@/jsx/dom/client/DOM.ts';

import { App } from './app/App.tsx';

import './app/assets/styles/styles.scss';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLElement;

// ручка для перерендера приложения (например, смена состояний (flux-state) или роутинга)
render(<App />, app);
