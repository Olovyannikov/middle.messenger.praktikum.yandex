import { VDom } from '@/jsx';

import { RootLayout } from '@/layouts';

import IndexPage from '@/pages';
import ErrorPage from '@/pages/Error';
import AuthPage from '@/pages/Auth';

export const routerConfig: Record<string, JSX.Element> = {
    '/': <IndexPage />,
    '/chats': <RootLayout>Chats</RootLayout>,
    '/auth': <AuthPage />,
    '/not-found': (
        <ErrorPage
            status={404}
            message="Кажется, что-то пошло не так, страница недоступна"
        />
    ),
    '/server-error': (
        <ErrorPage
            status={500}
            message="Кажется, что-то пошло не так, страница недоступна"
        />
    ),
};
