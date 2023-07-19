import { VDom } from '@/jsx';
import { Button } from '@/shared/ui/Button';
import { useRouter } from '@/shared/hooks/useRouter.ts';

import { classNames } from '@/shared/lib/clsx.ts';
import s from './styles.module.scss';

export interface TabProps {
    key: string;
    children: JSX.Children;
    title: string;
}

interface HashTabsProps {
    tabs: TabProps[];
}

export const HashTabs = ({ tabs }: HashTabsProps) => {
    const { hash } = useRouter();

    return (
        <div>
            <ul className={s.list}>
                {tabs?.map((tab) => (
                    <li
                        key={tab.key}
                        className={classNames(s.item, {
                            [s.active]: hash === tab.key,
                        })}
                    >
                        <Button hash href={tab.key} variant="text">
                            {tab.title}
                        </Button>
                    </li>
                ))}
            </ul>

            <div>{tabs.filter((el) => el.key === hash)[0]?.children}</div>
        </div>
    );
};
