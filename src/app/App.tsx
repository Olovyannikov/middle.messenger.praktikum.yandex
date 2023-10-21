import { VDom } from '@/jsx';

import IndexPage from '@/pages';
import { Route } from '@/app/router/components/Route/Route.tsx';
import { Registration } from '@/features/Registration/ui';
import MessengerPage from '@/pages/Messenger';
import SettingsPage from '@/pages/Settings';
import './assets/styles/styles.scss';

export const App = () => {
    return (
        <>
            <Route path="/">
                <IndexPage />
            </Route>
            <Route path="/sign-up">
                <Registration />
            </Route>
            <Route path="/messenger">
                <MessengerPage />
            </Route>
            <Route path="/settings">
                <SettingsPage />
            </Route>
        </>
    );
};
