import {
    Fiber,
    Effect,
    getEffectLevel,
    Text,
    Create,
    Update,
    Place,
    Delete,
    Host,
} from '../shared/Types.ts';
import { HostConfig } from './FiberHostConfig.ts';
import {
    getHostParentFiber,
    getHostSiblingFiber,
    getHostChildFiber,
} from './FiberTraverse.ts';
import {
    isRootFiber,
    isHookFiber,
    isTextFiber,
    isHostFiber,
    isFragmentFiber,
} from '@/jsx/is/Is.ts';
import { TestStackSize, resetStack } from '../shared/testStackSize';
import {
    setContainerFiber,
    setInternalFiber,
} from '@/jsx/reconciler/FiberReflection.ts';

function createStateNode(hostFiber: Fiber) {
    const { tag, props } = hostFiber;
    let stateNode = null;

    if (isTextFiber(hostFiber)) {
        stateNode = HostConfig.createTextNode(props?.nodeValue);
    }

    if (isRootFiber(hostFiber)) {
        stateNode = hostFiber.stateNode;
    }

    if (isHostFiber(hostFiber)) {
        stateNode = HostConfig.createElement(tag);
    }

    if (isFragmentFiber(hostFiber)) {
        stateNode = HostConfig.createDocumentFragment();
    }

    if (props?.ref) {
        const ref = props.ref;
        if (typeof ref === 'function') {
            ref(stateNode);
        } else {
            ref.current = stateNode;
        }
    }

    return stateNode;
}

function commitWork(fiber: Fiber) {
    const effectList = sortEffectList(fiber);
    effectList.forEach(commitUnitOfWork);

    // set root alternate
    if (isRootFiber(fiber)) {
        setContainerFiber(fiber);
    }

    // set hook alternate
    if (isHookFiber(fiber)) {
        setInternalFiber(fiber);
    }

    resetStack();
    const callback = fiber.callback;
    if (callback) callback(fiber);
}

function sortEffectList(fiber: Fiber) {
    const effectList = fiber.effectList || [];

    type NextEffect = { level: number; effect: Fiber };
    const nextEffects: Array<NextEffect> = [];
    for (const effect of effectList) {
        if (nextEffects.find((nextEffect) => nextEffect.effect === effect)) {
            continue;
        }
        const nextEffect = {
            level: getEffectLevel(effect.effectType as symbol),
            effect,
        };
        nextEffects.push(nextEffect);
    }

    fiber.effectList = nextEffects
        .sort((a, b) => b.level - a.level)
        .map(({ effect }) => effect);

    return fiber.effectList;
}

function commitUnitOfWork(fiber: Fiber) {
    const { effectType } = fiber;
    if (isHookFiber(fiber)) {
        switch (effectType) {
        case Create:
            commitHookMount(fiber);
            break;
        case Update:
            commitHookUpdate(fiber);
            break;
        case Place:
            commitHookMount(fiber);
            commitPlace(fiber);
            break;
        case Delete:
            commitHookUnMount(fiber);
            commitDelete(fiber);
            break;
        default:
            break;
        }
        setInternalFiber(fiber);
    } else {
        switch (effectType) {
        case Create:
            commitCreate(fiber);
            break;
        case Update:
            commitUpdate(fiber);
            break;
        case Place:
            commitPlace(fiber);
            break;
        case Delete:
            commitDelete(fiber);
            break;
        default:
            break;
        }
    }
}

function commitHookMount(hookFiber: Fiber) {
    const effect = hookFiber.memoizedState;
    if (!effect) {
        return;
    }
    const creators = effect.in;
    if (creators) {
        const nextEffects: Effect[] = [];
        while (creators.length) {
            TestStackSize('commitHookEffectList');
            const current = creators.pop();
            const nextEffect = current && current();
            if (nextEffect) {
                nextEffects.push(nextEffect);
            }
        }
        effect.out = nextEffects;
    }
}

function commitHookUnMount(hookFiber: Fiber) {
    const effect = hookFiber.memoizedState;
    if (!effect) {
        return;
    }
    const destroys = effect.out;
    if (destroys) {
        while (destroys.length) {
            TestStackSize('commitHookEffectList:1');
            const current = destroys.pop();
            current && current();
        }
    }
}

// update = unmount -> mount
function commitHookUpdate(hookFiber: Fiber) {
    commitHookUnMount(hookFiber);
    commitHookMount(hookFiber);
}

function commitCreate(hostFiber: Fiber) {
    const HostParent = getHostParentFiber(hostFiber);
    const parent = HostParent?.stateNode;
    const node = hostFiber.stateNode;
    parent && node && HostConfig.appendChild(parent, node);
}

function commitPlace(finishedWork: Fiber): void {
    const parentFiber = getHostParentFiber(finishedWork);
    if (!parentFiber) {
        return;
    }

    const parent = parentFiber.stateNode;

    const before = getHostSiblingFiber(finishedWork);
    let node = finishedWork;
    while (node) {
        TestStackSize('commitPlace');
        const isHost = node.$$typeof === Host || node.$$typeof === Text;
        if (isHost) {
            const stateNode = node.stateNode;
            if (before && parent && stateNode && before.stateNode) {
                HostConfig.insertBefore(parent, stateNode, before.stateNode);
            } else {
                parent &&
                    stateNode &&
                    HostConfig.appendChild(parent, stateNode);
            }
        } else if (node.child) {
            node.child.return = node;
            node = node.child;
            continue;
        }
        if (node === finishedWork) {
            return;
        }
        while (!node.sibling) {
            TestStackSize('commitPlace:1');
            if (!node.return || node.return === finishedWork) {
                return;
            }
            node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
    }
}

function commitUpdate(hostFiber: Fiber) {
    const alternate = hostFiber.alternate;
    const newProps = hostFiber.props;
    const node = hostFiber.stateNode;
    const oldProps = alternate ? alternate.props : {};

    const newPropsToUpdate = Object.fromEntries(
        Object.entries(newProps as Record<string, any>).filter(
            ([k]) => !['ref', 'children'].includes(k),
        ),
    );
    node &&
        HostConfig.updateProps(
            node,
            newPropsToUpdate,
            oldProps as Record<string, any>,
        );
}

function commitDelete(finishedWork: Fiber) {
    const current = finishedWork;

    if (isHookFiber(current)) {
        const HostChildFiber = getHostChildFiber(current);
        if (HostChildFiber) {
            const stateNode = HostChildFiber.stateNode;
            stateNode && HostConfig.removeSelf(stateNode);
            datchFiber(HostChildFiber);
        }
    } else {
        const stateNode = current.stateNode;
        stateNode && HostConfig.removeSelf(stateNode);
    }

    datchFiber(current);
}

function datchFiber(fiber: Fiber) {
    fiber.return = undefined;
    fiber.child = undefined;
    fiber.sibling = undefined;
    const alternate = fiber.alternate;
    if (alternate) {
        alternate.return = undefined;
        alternate.child = undefined;
        alternate.sibling = undefined;
    }
    fiber.alternate = undefined;
}

export {
    commitWork,
    commitCreate,
    commitUpdate,
    commitPlace,
    commitDelete,
    createStateNode
};
