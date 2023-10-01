import { VDom } from '@/jsx';
import { RootLayout } from '@/layouts';

import { useAuth } from '@/shared/hooks/useAuth.ts';
import { Spin } from '@/shared/ui/Spin';
import s from './styles.module.scss';

export default function MessengerPage() {
    const { isLoading, isAuth } = useAuth();

    if (isLoading) {
        return <Spin className={s.spinner} />;
    }

    if (!isAuth) {
        window.location.pathname = '/';
    }

    return (
        <RootLayout>
            <section className={s.chat}>chat page</section>
        </RootLayout>
    );
}
