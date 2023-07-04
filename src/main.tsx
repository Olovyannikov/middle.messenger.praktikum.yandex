import './style.css';
import { render} from "./jsx/h.ts";
import { App } from './components/app';

const app = document.querySelector<HTMLDivElement>('#app')!

render(App, app);
