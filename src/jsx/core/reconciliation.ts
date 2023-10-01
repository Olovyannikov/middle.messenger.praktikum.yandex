import { Component, Fiber, FiberAction, Node, State } from '../core/models';

const isEvent = (key: string) => key.startsWith('on');
const isProperty = (key: string) => !isEvent(key) && key !== 'children';
const isNew = (prev: any, next: any) => (key: any) => prev[key] !== next[key];
const isGone = (next: any) => (key: any) => !(key in next);

const updateNode = (node: Node, prevProps: any, newProps: any) => {
    // Update changed properties.
    prevProps &&
        Object.keys(prevProps)
            .filter(isProperty)
            .filter(isGone(newProps))
            .forEach((property) => {
                (node as any)[property] = '';
            });

    newProps &&
        Object.keys(newProps)
            .filter(isProperty)
            .filter(isNew(prevProps, newProps))
            .forEach((property) => {
                if (node instanceof HTMLScriptElement) {
                    node.setAttribute(property, newProps[property]);
                } else {
                    (node as any)[property] = newProps[property];
                }
            });

    // Update event listeners.
    prevProps &&
        Object.keys(prevProps)
            .filter(isEvent)
            .filter(
                (key) => !(key in newProps) || isNew(prevProps, newProps)(key),
            )
            .forEach((event) => {
                const eventType = event.toLowerCase().substring(2);
                node.removeEventListener(eventType, prevProps[event]);
            });

    newProps &&
        Object.keys(newProps)
            .filter(isEvent)
            .filter(isNew(prevProps, newProps))
            .forEach((name) => {
                const eventType = name.toLowerCase().substring(2);
                node.addEventListener(eventType, newProps[name]);
            });
};

const commitDelete = (fiber?: Fiber) => {
    if (!fiber) {
        return;
    }

    if (fiber.node) {
        fiber.node.remove();
    } else if (fiber.child) {
        commitDelete(fiber.child);
    }
};

const hoist = (fiber?: Fiber) => {
    while (fiber && !fiber.node) {
        fiber = fiber.parent;
    }
    return fiber;
};

const commitWork = (fiber?: Fiber) => {
    if (!fiber) {
        return;
    }

    commitWork(fiber.child);

    const parentFiber = hoist(fiber.parent);
    const parentNode = parentFiber?.node || null;

    const { action } = fiber;
    if (action === FiberAction.Create && fiber.node && parentNode) {
        'appendChild' in parentNode && parentNode.appendChild(fiber.node);
    } else if (action === FiberAction.Update && fiber.node && fiber.ancestor) {
        updateNode(fiber.node, fiber.ancestor.props, fiber.props);
    } else if (action === FiberAction.Delete && parentNode) {
        commitDelete(fiber);
    }

    commitWork(fiber.sibling);
};

const reconcileChildren = (root: Fiber, children: any) => {
    let index = 0;
    let prevSibling: Fiber | undefined;
    let oldFiber = root.ancestor?.child;

    while (index < children?.length || oldFiber) {
        const child = children[index];
        const isSameType = oldFiber && child && oldFiber.type === child.type;

        const newFiber = ((): Fiber | undefined => {
            if (isSameType) {
                return {
                    type: oldFiber?.type,
                    props: child.props,
                    node: oldFiber?.node,
                    parent: root,
                    ancestor: oldFiber,
                    action: FiberAction.Update,
                };
            }

            if (child) {
                return {
                    type: child.type,
                    props: child.props,
                    parent: root,
                    action: FiberAction.Create,
                };
            }

            return undefined;
        })();

        if (oldFiber && !isSameType) {
            oldFiber.action = FiberAction.Delete;
            State.deletions.push(oldFiber);
        }

        if (index === 0) {
            root.child = newFiber;
        } else if (child && prevSibling) {
            prevSibling.sibling = newFiber;
        }

        ++index;
        prevSibling = newFiber;
        oldFiber = oldFiber?.sibling;
    }
};

const resetContext = (fiber: Fiber) => {
    State.wipFiber = fiber;
    State.hookIndex = 0;
    State.wipFiber.hooks = [];
};

const updateFunctionComponent = (fiber: Fiber) => {
    resetContext(fiber);
    const results = (fiber.type as Component)(fiber.props);
    const children = Array.isArray(results) ? results : [results];
    reconcileChildren(fiber, children);
};

const createNode = (fiber: Fiber) => {
    const type = fiber.type as string;
    const node =
        type === 'TEXT_ELEMENT'
            ? document.createTextNode('')
            : document.createElement(type);
    updateNode(node, {}, fiber.props);
    return node;
};

const updateHostComponent = (fiber: Fiber) => {
    if (!fiber.node) {
        fiber.node = createNode(fiber);
    }
    reconcileChildren(fiber, fiber.props?.children);
};

const updateComponent = (fiber: Fiber) => {
    if (fiber.type instanceof Function) {
        updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber);
    }
};

const performCleanup = () => {
    State.pendingCleanups.forEach((cleanup) => cleanup());
    State.pendingCleanups = State.cleanups;
    State.cleanups = [];
    State.deletions.forEach(commitWork);
};

const resetState = () => {
    State.wipRoot = undefined;
    State.pendingUpdate = false;
};

const commitRoot = () => {
    performCleanup();
    if (State.wipRoot?.child) {
        commitWork(State.wipRoot.child);
        State.root = State.wipRoot;
    }
    resetState();
};

export { updateComponent, commitRoot };
