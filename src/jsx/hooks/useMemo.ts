import { getLastHook, isEqual } from '@/jsx/hooks/common.ts';
import { State } from '@/jsx/core/models.ts';

export const useMemo = <T>(compute: () => T, deps: any[]): T => {
    const lastHook = getLastHook();

    const hook = {
        value: null as any,
        deps,
    };

    if (lastHook) {
        if (isEqual(lastHook.deps, hook.deps)) {
            hook.value = lastHook.value;
        } else {
            hook.value = compute();
        }
    } else {
        hook.value = compute();
    }

    if (State.wipFiber?.hooks) {
        State.wipFiber?.hooks.push(hook);
        State.hookIndex++;
    }

    return hook.value;
};