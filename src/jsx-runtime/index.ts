export interface VNode {
    type: string | Function;
    key: string | null;
    props: any;
}

export const VDom = {
    createElement: (
        type: string | Function,
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
};

export function render(
    virtualDom: HTMLElement | string,
    realDomRoot: HTMLElement,
) {
    const evaluatedVirtualDom = evaluate(virtualDom);

    const virtualDomRoot: VNode = {
        type: realDomRoot.tagName.toLowerCase(),
        key: null,
        props: {
            id: realDomRoot.id,
            children: [evaluatedVirtualDom],
        },
    };

    sync(virtualDomRoot, realDomRoot);
}

// Any - Так как передать можно по факту любой элемент
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

            if ((realNode as HTMLElement).getAttribute(name) !== value) {
                (realNode as HTMLElement).setAttribute(name, String(value));
            }
        });
    }
    if (virtualNode.key && realNode instanceof HTMLElement) {
        realNode.dataset.key = virtualNode.key;
    }
    if (typeof virtualNode !== 'object' && virtualNode !== realNode.nodeValue) {
        realNode.nodeValue = virtualNode;
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
        const real = realChildren[i] as HTMLElement | undefined;

        // Remove
        if (virtual === undefined && real !== undefined) {
            realNode.remove();
        }

        // Update
        if (
            virtual !== undefined &&
            real !== undefined &&
            (virtual.type || '') === (real.tagName || '').toLowerCase()
        ) {
            sync(virtual, real);
        }

        // Replace
        if (
            virtual !== undefined &&
            real !== undefined &&
            (virtual.type || '') !== (real.tagName || '').toLowerCase()
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

function createRealNodeByVirtual(virtual: VNode | string): HTMLElement | Text {
    if (typeof virtual !== 'object') {
        return document.createTextNode('');
    }
    return document.createElement(virtual.type as string) as HTMLElement;
}
