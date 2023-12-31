declare namespace JSX {
    type Children = Element | Element[] | string;
    type Element = globalThis.Element;
    type Fragment = Node[];

    interface IntrinsicElements extends IntrinsicElementMap {}

    type HTMLElementCommonAttributes = Partial<{
        style: Partial<CSSStyleDeclaration> | string;
    }>;

    type Event = Event | MouseEvent;

    type CommonEvents = {
        [E in keyof GlobalEventHandlers]?: GlobalEventHandlers[E];
    };

    type GlobalAttributes = CommonEvents &
        Partial<{
            accesskey: string;
            autocaptialize:
                | 'off'
                | 'none'
                | 'on'
                | 'sentences'
                | 'words'
                | 'characters';
            autofocus: boolean;
            className: string;
            contenteditable: boolean | 'false';
            contextmenu: string;
            dir: 'ltr' | 'rtl' | 'auto';
            draggable: 'true' | 'false';
            enterkeyhint: string;
            hidden: boolean;
            id: string | number;
            inputmode: string;
            is: string;
            itemid: string;
            itemprop: string;
            itemref: string;
            itemscope: string;
            itemtype: string;
            lang: string;
            nonce: string;
            part: string;
            role: string;
            slot: string;
            spellcheck: boolean | 'false';
            tabindex: string | number;
            title: string;
            translate: true | 'yes' | 'no';
        }>;

    type IntrinsicElementMap = {
        [K in keyof HTMLElementTagNameMap]: HTMLElementCommonAttributes &
            GlobalAttributes &
            Record<string, any>;
    } & {
        [K in keyof SVGElementTagNameMap]: GlobalAttributes &
            Record<string, any>;
    };

    type Tag = keyof JSX.IntrinsicElements;
    type HTMLTag = keyof HTMLElementTagNameMap;
    type SVGTag = keyof SVGElementTagNameMap;

    interface Component<T = undefined | {}> {
        (properties: T, children?: Node[]): Element;
    }
}