import { VDom } from '@/jsx';

import IndexPage from '@/pages';
import ErrorPage from '@/pages/Error';
import AuthPage from '@/pages/Auth';
import ChatPage from '@/pages/Chat';

export const routerConfig: Record<string, JSX.Element> = {
    '/': <IndexPage />,
    '/chats': <ChatPage />,
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
