import { useEffect, useState } from '@/jsx';
import { State } from '@/jsx/core/models.ts';
import type { StateSetter } from '@/jsx/hooks/useState';

type UpdateStoreFunction<T> = (update: Partial<T>) => void;
type UseStoreFunction<T> = () => [T, StoreModifier<T>];

interface StoreModifier<T> {
    set: StateSetter<T>;
    update: UpdateStoreFunction<T>;
}

const createEmitter = <T>() => {
    const subscriptions = new Map();
    return {
        emit: (store?: T) =>
            subscriptions.forEach((listener) => listener(store)),
        subscribe: (listener: (store: T) => void) => {
            const key = Symbol();
            subscriptions.set(key, listener);
            return () => subscriptions.delete(key);
        },
    };
};

export const createStore = <T>(initialState?: T) => {
    let store = initialState;
    const emitter = createEmitter<T>();

    const set: StateSetter<T> = (action) => {
        store = action instanceof Function ? action(store) : action;
        emitter.emit(store);
    };

    const update: UpdateStoreFunction<T> = (partial) => {
        store = { ...store, ...partial } as T;
        emitter.emit(store);
    };

    const use: UseStoreFunction<T> = () => {
        const [localStore, setLocalStore] = useState(store);
        useEffect(() => emitter.subscribe(setLocalStore), [State.wipRoot]);
        return [localStore, { set, update }];
    };

    return {
        use,
        set,
        update,
    };
};
