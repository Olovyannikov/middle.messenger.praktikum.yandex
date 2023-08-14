export const Text = Symbol('Text');
export const Fragment = Symbol('DocumentFragment');
export const Root = Symbol('Container');
export const Hook = Symbol('Hook');
export const Host = Symbol('Host');
export const Unknown = Symbol('Unknown');

export const Place = Symbol('Place');
export const Update = Symbol('Update');
export const Delete = Symbol('Delete');
export const Create = Symbol('Create');

export const getEffectLevel = (effectType: symbol): number => {
    switch (effectType) {
    case Create:
        return 4;
    case Update:
        return 3;
    case Place:
        return 2;
    case Delete:
        return 1;
    default:
        return 0;
    }
};

export type Effect = () => (() => void) | void;

export interface MemoizedState {
    in?: Effect[];
    out?: Effect[];

    [id: number]: any;
}

export interface Fiber {
    tag?: any;
    $$typeof?: symbol;
    props?: any;
    memoizedState?: MemoizedState;
    stateNode?: any;
    return?: Fiber;
    child?: Fiber;
    sibling?: Fiber;
    alternate?: Fiber;
    effectType?: symbol;
    effectList?: Fiber[];
    callback?: (fiber: Fiber) => void;

    [key: string]: any;
}

