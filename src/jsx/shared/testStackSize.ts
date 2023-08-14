let MAX_STACK_SIZE = 10000;
const MAX_STACK_ID = Symbol('MAX_STACK_ID');

const setMaxStackSize = (size: number) => {
    MAX_STACK_SIZE = size;
};

const incrementStackSize: { [key: symbol]: { [id: string]: number } } = {};

const resetStackSize = (id = 'default') => {
    const size = incrementStackSize[MAX_STACK_ID];
    if (size) {
        size[id] = 0;
    }
};

const resetStack = () => {
    incrementStackSize[MAX_STACK_ID] = {};
};

type StackSizeMap = { [id: string]: number };
type StackListener = (
    stackSize: { id: string; size: number },
    stackSizeMap: StackSizeMap,
) => void;
let listeners: StackListener[];

const watchStackSize = (callback: StackListener) => {
    if (!listeners) {
        listeners = [];
    }

    listeners.push(callback);
    return () => {
        listeners.splice(listeners.indexOf(callback), 1);
    };
};

const TestStackSize = (id = 'default') => {
    if (!incrementStackSize[MAX_STACK_ID]) {
        resetStack();
    }
    const size = incrementStackSize[MAX_STACK_ID];

    if (id in size) {
        size[id]++;
    } else {
        size[id] = 1;
    }

    if (size[id] > MAX_STACK_SIZE) {
        throw new Error(
            `STACK SIZE OVERFLOW: ${id}, try to reset the MAX_STACK_SIZE(${MAX_STACK_SIZE});
      method: React.Stack.setMaxStackSize()`,
        );
    }

    if (listeners) {
        listeners.forEach((listener) => listener({ id, size: size[id] }, size));
    }
};

export {
    setMaxStackSize,
    TestStackSize,
    resetStackSize,
    watchStackSize,
    resetStack,
};
