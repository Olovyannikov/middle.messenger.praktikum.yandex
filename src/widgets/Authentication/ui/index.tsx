import { VDom } from '@/jsx';

import { Modal } from '@/shared/ui/Modal';
import { HashTabs } from '@/shared/ui/HashTabs';

import { useRouter } from '@/shared/hooks/useRouter.ts';

import { authTabs } from './config.tsx';
import s from './styles.module.scss';

export const Authentication = () => {
    const { hash } = useRouter();

    const titleMap: Record<string, string> = {
        '#login': 'Войти в аккаунт',
        '#register': 'Регистрация',
    };

    return (
        <Modal
            showClose={false}
            className={s.auth}
            open={true}
            title={titleMap[hash]}
        >
            <HashTabs tabs={authTabs} />
        </Modal>
    );
};
