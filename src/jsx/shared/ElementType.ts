interface MutableRefObject<T> {
    current: T;
}

type RefObject<T> = MutableRefObject<T> | ((value: T) => void);

interface Props<T> {
    ref?: RefObject<T>;
    children?: T;

    [compatibleProps: string]: any;
}

interface ReactElement {
    $$typeof: symbol;
    props: Props<any>;
    tag: any;
}

type FC<T extends Record<string, any>> = (
    props: T,
    ...params: any[]
) => ReactElement;
type RefForwardingComponent<T, P> = (
    props: P,
    ref: MutableRefObject<T>,
) => ReactElement;

export type Provider<T> = (props: {
    value?: T | undefined;
    children?: ReactElement | undefined;
}) => ReactElement | undefined;

export type Consumer<T> = (props: {
    children?: (context: T | undefined) => ReactElement | undefined;
}) => ReactElement | undefined;

interface ReactContext<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    value: T | undefined;
}

type LazyComponent<T> = (props: T) => Promise<{ default: () => JSX.Element }>;

export type {
    ReactElement,
    MutableRefObject,
    RefObject,
    Props,
    FC,
    RefForwardingComponent,
    ReactContext,
    LazyComponent,
};
