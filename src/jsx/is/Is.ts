import { Fiber, Host, Hook, Root, Text, Fragment } from '../shared/Types.ts';

const isSameTag = (element: Fiber, oldFiber: Fiber) =>
    element.tag === oldFiber.tag;

const isHookFiber = (fiber: Fiber): boolean => fiber.$$typeof === Hook;

const isRootFiber = (fiber: Fiber): fiber is Fiber => fiber.$$typeof === Root;

const isHostFiber = (fiber: Fiber): fiber is Fiber => fiber.$$typeof === Host;

const isTextFiber = (fiber: Fiber): fiber is Fiber => fiber.$$typeof === Text;

const isFragmentFiber = (fiber: Fiber): fiber is Fiber =>
    fiber.$$typeof === Fragment;

const isHostParentFiber = (fiber: Fiber): boolean =>
    isHostFiber(fiber) || isRootFiber(fiber);

const isHostChildFiber = (fiber: Fiber): boolean =>
    isHostFiber(fiber) || isTextFiber(fiber);

export {
    isSameTag,
    isHostParentFiber,
    isHostChildFiber,
    isHookFiber,
    isRootFiber,
    isHostFiber,
    isTextFiber,
    isFragmentFiber,
};
