import { VDom } from '@/jsx';

import IndexPage from '@/pages';
import { Route } from '@/app/router/components/Route.tsx';
import { Registration } from '@/features/Registration/ui';
import MessengerPage from '@/pages/Messenger';
import SettingsPage from '@/pages/Settings';
import './assets/styles/styles.scss';

export const App = () => {
    return (
        <>
            <Route path="/" component={IndexPage} />
            <Route path="/sign-up" component={Registration} />
            <Route path="/messenger" component={MessengerPage} />
            <Route path="/settings" component={SettingsPage} />
        </>
    );
};
