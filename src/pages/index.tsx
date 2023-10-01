import { VDom, useEffect } from '@/jsx';

import { RootLayout } from '@/layouts';
import { Login } from '@/features/Login/ui';
import { Spin, Container } from '@/shared/ui';

import { useAuth } from '@/shared/hooks';

import s from './styles.module.scss';

export default function IndexPage() {
    const { isLoading, isAuth } = useAuth();

    if (isLoading) {
        return <Spin className={s.spinner} />;
    }

    useEffect(() => {
        if (isAuth) {
            window.history.pushState({}, '', '/messenger');
            window.location.pathname = '/messenger';
        }
    }, [isAuth]);

    return (
        <RootLayout>
            <section className={s.page}>
                <Container>
                    <Login />
                </Container>
            </section>
        </RootLayout>
    );
}
