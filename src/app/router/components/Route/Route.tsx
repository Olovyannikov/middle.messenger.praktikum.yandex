import { Component, VDom } from '@/jsx';
import { useEffect } from '@/jsx/hooks/useEffect.ts';
import { useState } from '@/jsx/hooks/useState.ts';
import ErrorPage from '@/pages/Error';

interface RouterProps {
    path: string;
    component: Component;
}

const routes = ['/', '/messenger', '/settings', '/sign-up'];

export const Route = ({ path, component: Child }: RouterProps) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('navigate', onLocationChange);
        window.addEventListener('popstate', onLocationChange);
        window.addEventListener('hashchange', onLocationChange);
    }, []);

    if (Child && routes.includes(currentPath)) {
        return currentPath === path ? <Child /> : <></>;
    }

    return <ErrorPage status="404" message="Что-то пошло не так" />;
};