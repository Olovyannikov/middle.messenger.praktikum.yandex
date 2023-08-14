declare namespace JSX {
    type IntrinsicElements = {
        [K in keyof HTMLElementTagNameMap]: VDom.IntrinsicAttributes<
            HTMLElementTagNameMap[K]
        >;
    };

    export type Element = VDom.ReactElement;

    interface ElementChildrenAttribute {
        children: NonNullable<unknown>;
    }

    export import RefAttributes = VDom.MutableRefObject;
}