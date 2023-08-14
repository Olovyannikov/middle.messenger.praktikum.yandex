import * as ElementType from '@/jsx/shared/ElementType.ts';
import { Override } from '@/jsx/core/VDom.ts';

export type MutableRefObject<T> = ElementType.MutableRefObject<T>;
export type Props<T> = ElementType.Props<T>;

type ExAttributes<T> = {
    dangerouslySetInnerHTML?: { __html: string };
} & Props<T>;

export type HTMLAttributes<T extends HTMLElement> = Override<
    T,
    'style',
    CSSProperties
> &
    ExAttributes<T>;

export type IntrinsicAttributes<T extends HTMLElement> = Partial<
    HTMLAttributes<T>
>;
export type CSSProperties = Partial<CSSStyleDeclaration>;
export type Element = ElementType.VDomElement;

// context type
export type Consumer<T> = ElementType.Consumer<T>;
export type Provider<T> = ElementType.Provider<T>;
export type Context<T> = ElementType.ContextModel<T>;



