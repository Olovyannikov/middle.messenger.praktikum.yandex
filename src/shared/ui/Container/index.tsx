import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';

import s from './styles.module.scss';

interface ContainerProps {
    children?: JSX.Element;
    className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
    return (
        <div className={classNames(s.container, {}, [className])}>
            {children}
        </div>
    );
};
