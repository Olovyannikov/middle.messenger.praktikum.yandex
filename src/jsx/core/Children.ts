import { Fiber, Text } from '../shared/Types.ts';

export const toTextFiber = (nodeValue: string | number): Fiber => ({
    tag: '#text',
    $$typeof: Text,
    props: { nodeValue },
});

const flat = <T>(arr: T[]) => Array.prototype.concat(...arr);
export const flat2 = <T>(arr: T[]) => flat(flat(arr));

export const toArray = (...children: any[]): Fiber[] => {
    return flat2(children).reduce<Fiber[]>((acc, ch) => {
        if (ch === false || ch === undefined) return acc;

        if (typeof ch === 'number') {
            return acc.concat(toTextFiber(ch));
        }
        if (typeof ch === 'string') {
            return acc.concat(toTextFiber(ch));
        }

        return acc.concat(ch);
    }, [] as Fiber[]);
};

export const Children = {
    toArray,
    toTextFiber,
};