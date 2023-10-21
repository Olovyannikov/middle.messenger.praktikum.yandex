import { VDom } from '@/jsx';
import { Route } from './Route';

import 'jsdom-global/register';

describe('Route', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should render children when currentPath matches the specified path', () => {
        const container = document.createElement('div');
        VDom.render(
            <Route path="/">
                <div>Test Content</div>
            </Route>,
            container,
        );

        expect(container).toEqual(container);
    });

    it('should not render children when currentPath does not match the specified path', () => {
        const container = document.createElement('div');
        VDom.render(
            <Route path="/another">
                <div>Test Content</div>
            </Route>,
            container,
        );

        expect(container).toEqual(container);
    });

    it('should render ErrorPage when currentPath is not in the list of routes', () => {
        const container = document.createElement('div');
        VDom.render(
            <Route path="/another">
                <div>Test Content</div>
            </Route>,
            container,
        );

        expect(container.textContent).toBe('');
    });
});