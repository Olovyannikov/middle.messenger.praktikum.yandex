declare namespace JSX {
    type Element = HTMLElement | string | HTMLAnchorElement;
    type FC<P extends {}, T = JSX.Element> = (classList?: string[] | null, props?: P) => T;
    type Attributes = Pick<JSX.Element, 'id' | 'onclick' | 'className' | 'href' | 'type'>;

    interface IntrinsicElements extends IntrinsicElementMap {}
    type IntrinsicElementMap = {
        [K in keyof HTMLElementTagNameMap]: Partial<Attributes>;
    };

    type Props = Partial<{
        [Property in keyof Attributes]: Attributes[Property];
    }> | null;

    interface ComponentConstructor {
        (props?: JSX.Props, children?: Node[]): Node;
    }
}

declare namespace App {
    type Children = (string | Node | null | undefined | number)[];
}
