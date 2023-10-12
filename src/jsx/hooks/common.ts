import { State } from '../core/models';

export const isEqual = (a: object, b: object) => {
    if (Object.keys(a).length === Object.keys(b).length) {
        return Object.keys(a).every(
            (key) =>
                Object.prototype.hasOwnProperty.call(b, key) &&
                (a as any)[key] === (b as any)[key],
        );
    }
    return false;
};

export const getLastHook = () => {
    if (State.wipFiber?.ancestor?.hooks) {
        return State.wipFiber.ancestor.hooks[State.hookIndex];
    }
    return null;
};
