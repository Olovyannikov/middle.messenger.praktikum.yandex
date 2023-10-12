import { VDom } from '@/jsx';
import { App } from './app/App';

export const app = document.getElementById('app') as HTMLElement;

export const renderView = () => {
    VDom.render(<App />, app);
};

renderView();