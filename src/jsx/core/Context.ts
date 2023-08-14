import { ReactContext, Provider, Consumer } from '../shared/ElementType.ts';

function createContext<T extends Record<string, any>>(
    context: T | undefined,
): ReactContext<T> {
    const Provider: Provider<T> = ({ children, value }) => {
        context = value;
        return children;
    };
    const Consumer: Consumer<T> = ({ children }) => {
        return children?.(context);
    };
    return {
        Provider,
        Consumer,
        value: context,
    };
}

export { createContext };
