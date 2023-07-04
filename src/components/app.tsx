import {VDom} from '../jsx/h.ts';
import {LikeComponent} from './like';
import {Block} from "./Block.tsx";

export const App = (
    <main className="hello">
        <Block>asd <h1>Include h1 <LikeComponent big={true}/></h1></Block>
    </main>
);
