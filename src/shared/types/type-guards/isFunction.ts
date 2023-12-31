export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> =
    | TValue
    | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
    valOrFunction: ValueOrFunction<TValue, TArg>,
): valOrFunction is ValueFunction<TValue, TArg> =>
        typeof valOrFunction === 'function';

export const resolveValue = <TValue, TArg>(
    valOrFunction: ValueOrFunction<TValue, TArg>,
    arg: TArg,
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction);
