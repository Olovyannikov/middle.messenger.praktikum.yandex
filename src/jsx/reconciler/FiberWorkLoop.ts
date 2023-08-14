import { Fiber, Update } from '../shared/Types.ts';
import { reconcileChildren } from './ChildFiber.ts';
import {
    commitWork,
    commitUpdate,
    createStateNode,
} from './FiberCommitWork.ts';
import {
    isSameTag,
    isHookFiber,
    isRootFiber,
    isTextFiber,
    isHostFiber,
    isFragmentFiber,
} from '@/jsx/is/Is.ts';
import { resetIndex } from './FiberStack.ts';
import { TestStackSize } from '../shared/testStackSize';
import { getInternalFiber } from '@/jsx/reconciler/FiberReflection.ts';

let workInProgress: Fiber | undefined = undefined;
let pendingCommit: Fiber | undefined = undefined;

const getCurrentWorkInProgress = () => workInProgress;

function renderRoot(root: Fiber) {
    if (!workInProgress) workInProgress = createWorkInProgress(root);

    while (workInProgress) {
        workInProgress = performUnitOfWork(workInProgress, root);
        if (workInProgress === root) break;
        TestStackSize('renderRoot');
    }

    if (pendingCommit) {
        commitWork(pendingCommit);
        workInProgress = undefined;
        pendingCommit = undefined;
    }
}

function createWorkInProgress(fiber: Fiber) {
    workInProgress = fiber;
    workInProgress.effectList = undefined;
    return workInProgress;
}

function performUnitOfWork(fiber: Fiber | undefined, top: Fiber) {
    const next = fiber && beginWork(fiber);
    if (next) return next;
    let current = fiber;
    while (current) {
        if (current === top) return current;
        completeWork(current, top);
        if (current.sibling) return current.sibling;
        current = current.return;
        TestStackSize('performUnitOfWork');
    }
}

function completeWork(fiber: Fiber, top: Fiber) {
    const parent = fiber.return;
    if (parent) {
        const parentEffectList = parent.effectList || [];
        const fiberEffectList = fiber.effectList || [];
        parentEffectList.push(...fiberEffectList, fiber);
        fiber.effectList = [];
        delete fiber.effectList;

        // update effect.
        if (isHookFiber(parent) && parent.effectType === Update) {
            parentEffectList.push(parent);
        }

        parent.effectList = parentEffectList;

        if (parent === top) {
            pendingCommit = parent;
        }
    }
}

function beginWork(fiber: Fiber) {
    if (isHookFiber(fiber)) {
        return updateHOOKComponent(fiber);
    }
    if (isRootFiber(fiber)) {
        return updateHostComponent(fiber);
    }
    if (isTextFiber(fiber)) {
        return updateHostComponent(fiber);
    }
    if (isHostFiber(fiber)) {
        return updateHostComponent(fiber);
    }
    if (isFragmentFiber(fiber)) {
        return updateHostComponent(fiber);
    }
}

function updateHOOKComponent(hookFiber: Fiber) {
    const { tag: constructor, props } = hookFiber;
    hookFiber.alternate = getInternalFiber(hookFiber);

    if (props?.children && props.children.length === 1) {
        let singleChild = props.children[0];

        if (isTextFiber(singleChild)) {
            const { props } = singleChild;
            singleChild = props?.nodeValue;
        }

        props.children = singleChild;
    }

    resetIndex();
    const children = constructor(props);
    const child = reconcileChildren(hookFiber, children);

    hookFiber.child = child;
    return child;
}

function updateHostComponent(hostFiber: Fiber) {
    const {
        props: { children },
        stateNode,
        alternate,
    } = hostFiber;
    const isSame = alternate ? isSameTag(hostFiber, alternate) : false;
    if (!stateNode || !isSame) {
        hostFiber.stateNode = createStateNode(hostFiber);
        commitUpdate(hostFiber);
    }

    const child = reconcileChildren(hostFiber, children);
    hostFiber.child = child;
    return child;
}

export { getCurrentWorkInProgress, renderRoot };
