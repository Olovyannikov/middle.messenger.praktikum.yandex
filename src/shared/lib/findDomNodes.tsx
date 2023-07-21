import { getRealNodesByAttribute, render, VDom } from '@/jsx';
import { App } from '@/app/App.tsx';

const app = document.querySelector<HTMLDivElement>('#app') as HTMLElement;

export const findDomNodes = (attribute: string, value: string): HTMLElement[] =>
    getRealNodesByAttribute(render(<App />, app), attribute, value);
