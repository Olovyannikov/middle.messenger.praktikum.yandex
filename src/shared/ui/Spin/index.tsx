import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';
import s from './styles.module.scss';

interface SpinProps {
    className?: string;
}

export const Spin = ({ className = '' }: SpinProps) => {
    return <div className={classNames(s.spinner, {}, [className])} />;
};