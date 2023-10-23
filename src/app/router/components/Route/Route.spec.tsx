import { Component, VDom } from '@/jsx';
import { Route } from './Route';

import 'jsdom-global/register';

describe('Route', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    const Mock = <div>Test Content</div>;

    it('should render children when currentPath matches the specified path', () => {
        const container = document.createElement('div');

        VDom.render(
            <Route path="/" component={Mock as unknown as Component} />,
            container,
        );

        expect(container).toBe(container);
    });

    it('should not render children when currentPath does not match the specified path', () => {
        const container = document.createElement('div');
        VDom.render(
            <Route path="/another" component={Mock as unknown as Component} />,
            container,
        );

        expect(container.innerHTML).toBe('');
    });

    it('should render ErrorPage when currentPath is not in the list of routes', () => {
        const container = document.createElement('div');
        VDom.render(
            <Route path="/another" component={Mock as unknown as Component} />,
            container,
        );

        expect(container.textContent).not.toBe('ErrorPage');
    });
});