import { JSX } from '@/app/types/jsx';

interface MutableRefObject<T> {
    current: T;
}

type RefObject<T> = MutableRefObject<T> | ((value: T) => void);

interface Props<T> {
    ref?: RefObject<T>;
    children?: T;

    [compatibleProps: string]: any;
}

interface VDomElement {
    $$typeof: symbol;
    props: Props<any>;
    tag: any;
}

type FC<T extends Record<string, any>> = (
    props: T,
    ...params: any[]
) => VDomElement;
type RefForwardingComponent<T, P> = (
    props: P,
    ref: MutableRefObject<T>,
) => VDomElement;

export type Provider<T> = (props: {
    value?: T | undefined;
    children?: VDomElement | undefined;
}) => VDomElement | undefined;

export type Consumer<T> = (props: {
    children?: (context: T | undefined) => VDomElement | undefined;
}) => VDomElement | undefined;

interface ContextModel<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    value: T | undefined;
}

type LazyComponent<T> = (props: T) => Promise<{ default: () => JSX.Element }>;

export type {
    VDomElement,
    MutableRefObject,
    RefObject,
    Props,
    FC,
    RefForwardingComponent,
    ContextModel,
    LazyComponent,
};
