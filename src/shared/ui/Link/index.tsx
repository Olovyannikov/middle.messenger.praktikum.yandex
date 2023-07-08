import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';
import s from './styles.module.scss';

interface LinkProps {
    href: string;
    children?: JSX.Element;
    className?: string;
    disabled?: boolean;
    asRoute?: boolean;
}

export const Link = ({
    href,
    className = '',
    disabled = false,
    asRoute = true,
    children,
}: LinkProps) => {
    return (
        <a
            aria-disabled={disabled}
            href={href}
            data-link={asRoute}
            className={classNames(s.link, {}, [className])}
        >
            {children}
        </a>
    );
};
