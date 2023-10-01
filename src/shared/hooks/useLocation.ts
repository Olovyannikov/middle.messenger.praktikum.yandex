import { useEffect, useState } from '@/jsx';

function getCurrentLocation() {
    return {
        pathname: window.location.pathname,
        search: window.location.search,
    };
}

const listeners: (() => void)[] = [];

export const useLocation = () => {
    const [{ pathname, search }, setLocation] = useState(getCurrentLocation());

    /** All components using the 'useLocation' hook will update. */
    function notify() {
        listeners.forEach((listener) => listener());
    }

    function handleChange() {
        setLocation(getCurrentLocation());
    }

    useEffect(() => {
        listeners.push(handleChange);
        window.addEventListener('popstate', handleChange);
        return () => {
            listeners.splice(listeners.indexOf(handleChange), 1);
            window.removeEventListener('popstate', handleChange);
        };
    }, []);

    function push(url: string) {
        window.history.pushState({}, '', url);
        notify();
    }

    function replace(url: string) {
        window.history.replaceState({}, '', url);
        notify();
    }

    return {
        push,
        replace,
        pathname,
        search,
    };
};