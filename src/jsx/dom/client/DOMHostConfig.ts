interface HTMLElementWithDynamicProps extends HTMLElement {
    [key: string]: any;
}

function createElement(tag: string) {
    return document.createElement(tag);
}

function createDocumentFragment() {
    return document.createDocumentFragment();
}

function createTextNode(data: string | number) {
    return document.createTextNode(String(data));
}

function insertBefore(
    parent: HTMLElement,
    newChild: HTMLElement,
    refChild: Node,
) {
    parent.insertBefore(newChild, refChild);
}

function appendChild(parent: HTMLElement, ...nodes: (string | Node)[]) {
    parent.append(...nodes);
}

function removeSelf(node: HTMLElement) {
    node.remove();
}

function removeAllChild(node: HTMLElement) {
    node.innerHTML = '';
}

function updateProps(
    node: HTMLElementWithDynamicProps,
    newProps: Record<string, any>,
    oldProps: Record<string, any>,
) {
    Object.entries(newProps).forEach(([k, v]) => {
        if (k === 'style') return;
        if (oldProps[k] === v) return;

        if (k.startsWith('on')) {
            k = k.toLowerCase();
        }

        if (k === 'dangerouslySetInnerHTML') {
            k = 'innerHTML';
            v = v.__html;
        }

        node[k] = v;
    });

    if (newProps['style']) {
        const newStyle = newProps['style'];
        const oldStyle = oldProps['style'] || {};
        Object.entries(newStyle).forEach(([k, v]) => {
            if (oldStyle[k] === v) return;
            (node.style as any)[k] = v;
        });
    }
}

export {
    createElement,
    createDocumentFragment,
    createTextNode,
    insertBefore,
    appendChild,
    removeSelf,
    removeAllChild,
    updateProps,
};
