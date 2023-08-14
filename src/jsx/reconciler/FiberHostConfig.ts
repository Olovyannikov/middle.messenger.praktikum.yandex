const HostConfig = {} as HostConfigType;

interface HostConfigType {
    createElement(tag: string): any;

    createDocumentFragment(): any;

    createTextNode(data: string | number): any;

    insertBefore(parent: any, newChild: any, refChild: any): void;

    appendChild(parent: any, ...nodes: (string | any)[]): void;

    removeSelf(node: any): void;

    removeAllChild(node: any): void;

    updateProps(node: any, newProps: object, oldProps: object): void;
}

function setHostConfig(config: HostConfigType) {
    Object.assign(HostConfig, config);
}

export { HostConfig, setHostConfig };
export type { HostConfigType };