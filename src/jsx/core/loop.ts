import { Fiber, State } from '../core/models';
import { commitRoot, updateComponent } from '../core/reconciliation';

const nextUnitOfWork = (fiber?: Fiber) => {
    while (fiber) {
        if (fiber.sibling) {
            return fiber.sibling;
        }
        fiber = fiber.parent;
    }
    return undefined;
};

const performUnitOfWork = (fiber: Fiber) => {
    updateComponent(fiber);

    if (fiber.child) {
        return fiber.child;
    }

    return nextUnitOfWork(fiber);
};

const requestIdleCallback = (handler: (deadline: IdleDeadline) => void) => {
    const start = Date.now();
    return window.setTimeout(() => {
        handler({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
        });
    });
};

const workLoop = (deadline: IdleDeadline) => {
    let shouldYield = false;
    while (State.nextUnitOfWork && !shouldYield) {
        State.nextUnitOfWork = performUnitOfWork(State.nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }

    if (!State.nextUnitOfWork && State.wipRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop);
};

export const startWorkLoop = () => {
    requestIdleCallback(workLoop);
};
