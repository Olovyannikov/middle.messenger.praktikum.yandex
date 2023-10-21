import { startWorkLoop } from '../core/loop';
import { Component, Fiber, Node, State } from '../core/models';

const unwind = <T>(children: T | T[], out: T[]) => {
    if (children === null || typeof children === 'boolean') {
        return out;
    }

    if (children instanceof Array) {
        children.forEach((child) => unwind(child, out));
    } else {
        out.push(children);
    }

    return out;
};

export const createTextElement = (text: string): Fiber => {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [] as object[],
        },
    };
};

const createFragmentElement = (props: any): Fiber => {
    return props.children;
};

const createElement = (
    type: string | Component,
    props: object,
    ...children: object[]
) => {
    children = unwind(children, []);
    return {
        type,
        props: {
            ...props,
            children: children.map((child) =>
                child instanceof Object ? child : createTextElement(child),
            ),
        },
    };
};

const render = (element: Element, container: Node) => {
    State.wipRoot = {
        node: container,
        props: {
            children: [element],
        },
        hooks: [],
        ancestor: State.root,
    };

    State.deletions = [];
    State.cleanups = [];
    State.pendingCleanups = [];
    State.pendingUpdate = false;

    State.nextUnitOfWork = State.wipRoot;
    startWorkLoop();
};

export { createFragmentElement, createElement, render };
