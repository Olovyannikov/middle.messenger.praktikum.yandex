export interface VNode {
    type: string | (() => void);
    key: string | null;
    props: any;
    domNode?: HTMLElement | Text | null;
}

function createRealNodeByVirtual(virtual: VNode | string): HTMLElement | Text {
    if (typeof virtual !== 'object') {
        return document.createTextNode(String(virtual));
    }
    return document.createElement(virtual.type as string) as HTMLElement;
}

function evaluate(virtualNode: any): any {
    if (typeof virtualNode !== 'object') {
        return virtualNode;
    }

    if (typeof virtualNode.type === 'function') {
        return evaluate(virtualNode.type(virtualNode.props));
    }

    const props = virtualNode.props || {};

    return {
        ...virtualNode,
        props: {
            ...props,
            children: Array.isArray(props.children)
                ? props.children.map(evaluate)
                : [evaluate(props.children)],
        },
    };
}

function sync(virtualNode: VNode, realNode: HTMLElement | Text): void {
    // Sync element
    if (virtualNode.props) {
        Object.entries(virtualNode.props).forEach(([name, value]) => {
            if (name === 'key' || name === 'children') {
                return;
            }

            if (name === 'className') {
                name = 'class';
            }

            if (name === 'onClick') {
                name = 'onclick';
            }

            if (
                (realNode as HTMLElement).getAttribute(name) !== String(value)
            ) {
                (realNode as HTMLElement).setAttribute(name, String(value));
            }
        });
    }
    if (virtualNode.key && realNode instanceof HTMLElement) {
        realNode.dataset.key = virtualNode.key;
    }
    if (typeof virtualNode !== 'object' && virtualNode !== realNode.nodeValue) {
        realNode.nodeValue = String(virtualNode);
    }

    // Sync child nodes
    const virtualChildren = virtualNode.props
        ? virtualNode.props.children || []
        : [];
    const realChildren = realNode.childNodes;

    for (
        let i = 0;
        i < virtualChildren.length || i < realChildren.length;
        i++
    ) {
        const virtual = virtualChildren[i];
        const real = realChildren[i] as HTMLElement | Text | undefined;

        // Remove
        if (virtual === undefined && real !== undefined) {
            realNode.removeChild(real);
        }

        // Update
        if (
            virtual !== undefined &&
            real !== undefined &&
            (virtual.type || '') ===
                (real instanceof HTMLElement ? real.tagName.toLowerCase() : '')
        ) {
            sync(virtual, real);
        }

        // Replace
        if (
            virtual !== undefined &&
            real !== undefined &&
            (virtual.type || '') !==
                (real instanceof HTMLElement ? real.tagName.toLowerCase() : '')
        ) {
            const newReal = createRealNodeByVirtual(virtual);
            sync(virtual, newReal);
            realNode.replaceChild(newReal, real);
        }

        // Add
        if (virtual !== undefined && real === undefined) {
            const newReal = createRealNodeByVirtual(virtual);
            sync(virtual, newReal);
            realNode.appendChild(newReal);
        }
    }
}

export function render(
    virtualDom: HTMLElement | JSX.Element | string,
    realDomRoot: HTMLElement | string,
): HTMLElement {
    const evaluatedVirtualDom = evaluate(virtualDom);

    const realDomRootNode =
        typeof realDomRoot === 'string'
            ? document.querySelector(realDomRoot)
            : realDomRoot;

    if (!realDomRootNode) {
        throw new Error('Invalid root node');
    }

    const virtualDomRoot: VNode = {
        type: 'div',
        key: null,
        props: {
            children: [evaluatedVirtualDom],
        },
    };

    const rootRealNode = createRealNodeByVirtual(virtualDomRoot);
    sync(virtualDomRoot, rootRealNode);

    realDomRootNode.innerHTML = '';
    realDomRootNode.appendChild(rootRealNode);

    return rootRealNode as HTMLElement;
}

export function getRealNodesByAttribute(
    rootRealNode: HTMLElement,
    attribute: string,
    value?: string,
): HTMLElement[] {
    const matchingNodes: HTMLElement[] = [];

    function findNodes(node: HTMLElement) {
        if (node.getAttribute(attribute) === value || !value) {
            matchingNodes.push(node);
        }

        const children = node.children;
        for (let i = 0; i < children.length; i++) {
            findNodes(children[i] as HTMLElement);
        }
    }

    findNodes(rootRealNode);

    return matchingNodes;
}

export const VDom = {
    createElement: (
        type: string | (() => void),
        config: any,
        ...children: any[]
    ) => {
        const key = config ? config.key || null : null;
        const props = config || {};

        if (children.length === 1) {
            props.children = children[0];
        } else {
            props.children = children;
        }

        return {
            type,
            key,
            props,
        };
    },
    render,
};