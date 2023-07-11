import { VDom } from '@/jsx';

import { Registration } from '@/features/Registration/ui';
import { Login } from '@/features/Login/ui';
import type { TabProps } from '@/shared/ui/HashTabs';

export const authTabs: TabProps[] = [
    { key: '#login', title: 'Войти', children: <Login /> },
    { key: '#register', title: 'Регистрация', children: <Registration /> },
];
