import { useRouter } from '@/shared/hooks/useRouter.ts';
import { routerConfig } from '@/app/router/config.tsx';
import IndexPage from '@/pages';
import { VDom } from '@/jsx/index.ts';

export const Router = () => {
    const { pathname } = useRouter();

    if (!routerConfig[pathname]) {
        return routerConfig['/not-found'];
    }

    return <IndexPage />;
};
