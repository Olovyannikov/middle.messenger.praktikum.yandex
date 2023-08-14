import { is } from './objectIs';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function shallowEqual(objA: object, objB: object): boolean {
    if (is(objA, objB)) {
        return true;
    }

    if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
    ) {
        return false;
    }

    const keysA = Object.keys(objA) as Array<keyof typeof objA>; // Use keyof and type assertion
    const keysB = Object.keys(objB) as Array<keyof typeof objB>; // Use keyof and type assertion

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (!hasOwnProperty.call(objB, key) || !is(objA[key], objB[key])) {
            return false;
        }
    }

    return true;
}

export { shallowEqual };
