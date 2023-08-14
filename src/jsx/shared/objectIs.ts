export const is = (x: any, y: any) =>
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y);
