import { getCurrentWorkInProgress } from './FiberWorkLoop.ts';
import { scheduleWork } from './FiberReconciler.ts';
import { getIndex } from './FiberStack.ts';
import { is } from '../shared/objectIs';
import { Effect, MemoizedState } from '../shared/Types.ts';
import { MutableRefObject, ContextModel } from '../shared/ElementType.ts';

const areHookInputsEqual = (
    nextDeps: readonly any[],
    prevDeps: readonly any[] | null,
) => {
    if (prevDeps === null) {
        return false;
    }
    for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
        if (is(nextDeps[i], prevDeps[i])) {
            continue;
        }
        return false;
    }
    return true;
};

const useState = <T>(initialState: T): [T, (state: T) => void] => {
    const id = getIndex();
    const fiber = getCurrentWorkInProgress();

    const memoizedState: MemoizedState = fiber?.memoizedState || {};
    if (!(id in memoizedState)) {
        memoizedState[id] = initialState;
        if (fiber) {
            fiber.memoizedState = memoizedState;
        }
    }

    const setState = (state: T) => {
        if (state === memoizedState[id]) return;
        memoizedState[id] = state;
        fiber && scheduleWork(fiber);
    };

    return [memoizedState[id], setState];
};

const useReducer = <S, A>(
    initReducer: (state: S, action: A) => S,
    initialState: S,
    initAction?: A,
): [S, (action: A) => void] => {
    const reducer = useCallBack(initReducer);
    const initState =
        initAction && reducer
            ? reducer(initialState, initAction)
            : initialState;
    const [state, setState] = useState(initState);
    const dispatch = (action: A) => reducer && setState(reducer(state, action));
    return [state, dispatch];
};

const useRef = <T>(value?: T): MutableRefObject<T | undefined> => {
    const [state] = useState({ current: value });
    return state as MutableRefObject<T | undefined>;
};

const useCallBack = <T extends (...args: any[]) => any>(
    callback: T,
    deps?: readonly any[],
) => {
    const ref = useRef(callback);
    const prevDepsRef = useRef<readonly any[]>([]); // Initialize with an empty array
    if (
        deps &&
        prevDepsRef.current &&
        areHookInputsEqual(deps, prevDepsRef.current)
    ) {
        return ref.current;
    } else {
        ref.current = callback;
        prevDepsRef.current = deps || [];
        return callback;
    }
};

const useMemo = <T>(memoFunc: () => T, deps?: readonly any[]) => {
    const ref = useRef<T | null>(null);
    const prevDepsRef = useRef<readonly any[] | null>(null); // Initialize with null
    if (
        deps &&
        prevDepsRef.current &&
        areHookInputsEqual(deps, prevDepsRef.current)
    ) {
        return ref.current;
    } else {
        ref.current = memoFunc();
        prevDepsRef.current = deps || null; // Update with new value or null
        return ref.current;
    }
};

const pushEffect = (effect: MemoizedState | null, create: Effect) => {
    const sideEffect = effect || {};
    const updateQueue = sideEffect.in || [];
    updateQueue.push(create);
    sideEffect.in = updateQueue;
    return sideEffect;
};

const useEffect = (create: Effect, deps?: readonly any[]) => {
    const fiber = getCurrentWorkInProgress();
    const effect = fiber?.memoizedState;
    const prevDepsRef = useRef<readonly any[] | null | undefined>(null); // Initialize with a type that includes null and undefined
    if (
        deps !== undefined &&
        prevDepsRef.current &&
        areHookInputsEqual(deps, prevDepsRef.current)
    ) {
        return;
    } else {
        prevDepsRef.current = deps;
        if (fiber && effect) {
            fiber.memoizedState = pushEffect(effect, create);
        }
    }
};

const useContext = <T>(context: ContextModel<T>): T => {
    if (context.value === undefined) {
        throw new Error(
            'Context value is undefined. Make sure the context is properly initialized.',
        );
    }
    return context.value;
};
export {
    useCallBack,
    useMemo,
    useReducer,
    useRef,
    useState,
    useEffect,
    useContext
};
