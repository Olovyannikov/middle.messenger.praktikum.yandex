import {VDom} from '../jsx/h.ts';

interface LikeProps {
    big?: boolean;
    children?: JSX.Element;
}

export function LikeComponent({big = false, children}: LikeProps) {
    return (
        <span>
            <span className={`like${big ? ' big' : ''}`}>
                {children}
            👍<hr/>
            </span>
        </span>
    );
}
