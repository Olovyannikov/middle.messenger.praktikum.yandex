import { getLastHook } from '@/jsx/hooks/common';
import { State } from '../core/models';

export type SetStateAction<T> = ((prevState?: T) => T) | T | undefined;
export type StateSetter<T> = (action: SetStateAction<T>) => void;

const causeUpdate = () => {
    if (State.root) {
        State.wipRoot = {
            node: State.root.node,
            props: State.root.props,
            ancestor: State.root,
        };
        State.deletions = [];
        State.nextUnitOfWork = State.wipRoot;
    }
};

export const useState = <T>(initial?: T): [T, StateSetter<T>] => {
    const lastHook = getLastHook();
    const hook = {
        queue: lastHook?.queue || [],
        state: lastHook?.state || initial,
    };

    hook.queue.forEach((action: SetStateAction<T>) => {
        hook.state = action instanceof Function ? action(hook.state) : action;
    });

    const setState: StateSetter<T> = (action: SetStateAction<T>) => {
        hook.queue.push(action);
        causeUpdate();
    };

    if (State.wipFiber?.hooks) {
        State.wipFiber.hooks.push(hook);
        State.hookIndex++;
    }

    return [hook.state, setState];
};
