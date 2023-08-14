import { Fiber } from '../shared/Types.ts';

const combiner = new WeakMap<object, Fiber>();

export function setInternalFiber(hookFiber: Fiber) {
    const { tag: constructor } = hookFiber;
    combiner.set(constructor, hookFiber);
}

export function getInternalFiber(hookFiber: Fiber) {
    const { tag: constructor } = hookFiber;
    return combiner.get(constructor);
}

export function setContainerFiber(rootFiber: Fiber) {
    const { stateNode: container } = rootFiber;
    combiner.set(container, rootFiber);
}

export function getContainerFiber(rootFiber: Fiber) {
    const { stateNode: container } = rootFiber;
    return combiner.get(container);
}

export function hasContainerFiber(container: any) {
    return combiner.has(container);
}
