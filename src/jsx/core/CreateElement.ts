import { Fiber, Unknown, Host, Fragment, Hook } from '../shared/Types.ts';
import { Children } from './Children.ts';

const createTextElement = (
    nodeValue: string | number,
): {
    tag: string;
    $$typeof: { prototype: Text; new (data?: string): Text };
    props: { nodeValue: string | number };
} => ({
    tag: '#text',
    $$typeof: Text,
    props: { nodeValue },
});

const createElement = (tag: any, props: object, ...children: any[]): Fiber => {
    props = { ...props, children: Children.toArray(...children) };

    if (typeof tag === 'string') {
        return { $$typeof: Host, tag, props };
    }
    if (typeof tag === 'function') {
        return { $$typeof: Hook, tag, props };
    }
    if (tag === Fragment) {
        return { $$typeof: Fragment, tag: '#fragment', props };
    }

    return { $$typeof: Unknown, tag, props };
};

export { createElement, createTextElement };
