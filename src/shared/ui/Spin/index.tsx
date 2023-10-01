import { VDom } from '../../../jsx';
import s from './styles.module.scss';
import { classNames } from '@/shared/lib/clsx.ts';

interface SpinProps {
    className?: string;
}

export const Spin = ({ className = '' }: SpinProps) => {
    return <div className={classNames(s.spinner, {}, [className])} />;
};