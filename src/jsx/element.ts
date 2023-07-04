import {isNode} from "@/shared/lib/isNode.ts";
import {notNull} from '@/shared/lib/notNull.ts';

const makeHtmlString = (child: unknown) => (notNull(child) ? String(child) : '');
const stringifyChild = (children: App.Children) => children.map(child => (isNode(child) ? child : makeHtmlString(child)));

export const createElement = <K extends keyof HTMLElementTagNameMap>(tagName: K) => {
    return (children?: App.Children) => {
        const element = document.createElement(tagName);

        if (children) {
            element.append(...stringifyChild(children));
        }

        return element;
    };
}


