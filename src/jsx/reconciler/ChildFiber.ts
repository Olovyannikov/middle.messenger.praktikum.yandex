import { Create, Delete, Fiber, Place, Update } from '../shared/Types.ts';
import { isSameTag, isHookFiber } from '../is/Is.ts';
import { TestStackSize } from '../shared/testStackSize';
import { Children } from '../core/Children.ts';

function reconcileChildren(fiber: Fiber, children: Fiber[]) {
    if (isHookFiber(fiber)) {
        reconcileHookRetFiber(fiber);
    }

    children = Children.toArray(children);

    const alternate = fiber.alternate;
    let nextOldFiber = alternate ? alternate.child : null;

    let newFiber: Fiber | undefined = undefined;
    let index = 0;

    while (index < children.length || nextOldFiber) {
        TestStackSize('reconcileChildren');

        const prevChild = newFiber;
        let oldFiber = nextOldFiber;

        if (oldFiber) {
            if (oldFiber.effectType === Delete) {
                oldFiber = null;
            }
        }

        const element = index < children.length && children[index];

        // update
        if (oldFiber && element && isSameTag(element, oldFiber)) {
            newFiber = updateSlot(element, oldFiber, fiber);
        }

        // place
        else if (oldFiber && element && !isSameTag(element, oldFiber)) {
            newFiber = placeChild(element, oldFiber, fiber);
        }

        // create
        else if (!oldFiber && element) {
            newFiber = createChild(element, fiber);
        }

        // delete
        else if (oldFiber && !element) {
            deleteChild(fiber, oldFiber);
        }

        // next alternate
        if (nextOldFiber) nextOldFiber = nextOldFiber.sibling;

        if (index === 0 || !fiber.child) {
            fiber.child = newFiber;
        } else if (prevChild) {
            if (element) {
                prevChild.sibling = newFiber;
            } else {
                prevChild.sibling = undefined;
                delete prevChild.sibling;
            }
        }
        index++;
    }

    return fiber.child;
}

function reconcileHookRetFiber(hookFiber: Fiber) {
    const alternate = hookFiber.alternate;
    //update hook effect
    if (alternate) {
        if (isSameTag(alternate, hookFiber)) {
            // update
            hookFiber.effectType = Update;
        } else {
            // place
            hookFiber.effectType = Place;
            alternate.effectType = Delete;
        }
    } else {
        // create
        hookFiber.effectType = Create;
    }
}

function createChild(element: Fiber, returnFiber: Fiber) {
    const newFiber: Fiber = {
        ...element,
        return: returnFiber,
        effectType: Create,
    };
    return newFiber;
}

function updateSlot(element: Fiber, oldFiber: Fiber, returnFiber: Fiber) {
    const newFiber: Fiber = {
        ...oldFiber,
        ...element,
        return: returnFiber,
        effectType: Update,
        alternate: oldFiber,
    };
    oldFiber.alternate = undefined;
    return newFiber;
}

function placeChild(element: Fiber, childToPlace: Fiber, returnFiber: Fiber) {
    const newFiber: Fiber = {
        ...element,
        return: returnFiber,
        effectType: Place,
        alternate: childToPlace,
    };

    deleteChild(returnFiber, childToPlace);
    return newFiber;
}

function deleteChild(returnFiber: Fiber, childToDelete: Fiber) {
    childToDelete.effectType = Delete;
    const effectList = returnFiber.effectList || [];
    effectList.push(childToDelete);
    returnFiber.effectList = effectList;

    // delete child
    const child = childToDelete.child;
    if (child) {
        child.effectType = Delete;
    }
}

export { reconcileChildren };
