export function isObject(object: unknown) {
    return (
        (typeof object === 'object' || typeof object === 'function') &&
        object !== null
    );
}