import { getLastHook, isEqual } from '@/jsx/hooks/common';
import { State } from '../core/models';

export const useEffect = (
    callback: (updating?: boolean) => any,
    deps: any[],
) => {
    const lastHook = getLastHook();
    const hook = {
        deps,
    };

    if (
        !lastHook ||
        !isEqual(lastHook.deps, hook.deps) ||
        State.pendingUpdate
    ) {
        const closure = (updating: boolean) => () => {
            const cleanup = callback(updating);
            if (cleanup instanceof Function) {
                State.cleanups.push(cleanup);
            }
        };

        // Use window.setTimeout to prevent causing side effects before the first render.
        window.setTimeout(closure(State.pendingUpdate));
    }

    if (State.wipFiber?.hooks) {
        State.wipFiber.hooks.push(hook);
        State.hookIndex++;
    }
};
