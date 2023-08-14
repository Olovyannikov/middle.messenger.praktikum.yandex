import * as HostConfig from './DOMHostConfig.ts';
import FiberReconciler from '@/jsx/reconciler/FiberReconciler.ts';

const renderer = FiberReconciler(HostConfig);

export const render = (
    component: JSX.Element,
    container: HTMLElement,
    callback?: () => void,
) => {
    if (container === null) {
        throw new Error('Target container is not a DOM element.');
    } else {
        const isContainer = renderer.isContainer(container);
        if (isContainer) {
            renderer.updateContainer(component, container, callback);
        } else {
            renderer.createContainer(component, container, callback);
        }
    }
};

const DOM = {
    render,
};

export { HostConfig };
export default DOM;
