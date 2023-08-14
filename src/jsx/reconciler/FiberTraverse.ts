import { Fiber, Place } from '../shared/Types.ts';
import { isHostParentFiber, isHostChildFiber } from '@/jsx/is/Is.ts';
import { TestStackSize } from '../shared/testStackSize';

function getHostSiblingFiber(fiber: Fiber): Fiber | undefined {
    let node: Fiber = fiber;
    while (node) {
        TestStackSize('getHostSiblingFiber');
        while (!node.sibling && node.return) {
            node = node.return;
        }
        if (!node.sibling || isHostParentFiber(node.return)) {
            return undefined;
        }
        node.sibling.return = node.return;
        node = node.sibling;
        while (!isHostChildFiber(node)) {
            if (node.effectType === Place) {
                continue;
            }
            if (!node.child) {
                continue;
            } else {
                node.child.return = node;
                node = node.child;
            }
        }
        if (node.effectType !== Place) {
            return node;
        }
    }
    return undefined;
}

function getHostParentFiber(fiber: Fiber): Fiber | undefined {
    let parent = fiber.return;
    while (parent) {
        TestStackSize('getHostParentFiber');
        if (isHostParentFiber(parent)) {
            return parent;
        }
        parent = parent.return;
    }
    return undefined; // Ensure that there's a return for all code paths
}

function getHostChildFiber(fiber: Fiber): Fiber | undefined {
    let child = fiber.child;
    while (child) {
        TestStackSize('getHostChildFiber');
        if (isHostChildFiber(child)) {
            return child;
        }
        child = child.child;
    }
    return undefined; // Ensure that there's a return for all code paths
}

export { getHostChildFiber, getHostParentFiber, getHostSiblingFiber };
