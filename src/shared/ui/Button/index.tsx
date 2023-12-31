import { VDom } from '@/jsx';
import { classNames as clsx } from '@/shared/lib/clsx.ts';

import { Spin } from '@/shared/ui';
import { Link } from '@/app/router/components/Link.tsx';
import s from './styles.module.scss';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonType = 'submit' | 'button';
type ButtonVariant = 'primary' | 'secondary' | 'text' | 'info';

interface ButtonProps {
    children?: JSX.Element;
    className?: string;
    disabled?: boolean;
    hash?: boolean;
    href?: string;
    loading?: boolean;
    onClick?: () => void;
    rounded?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
    variant?: ButtonVariant;
}

export const Button = ({
    children,
    loading,
    className = '',
    href,
    hash,
    size = 'medium',
    type = 'button',
    variant = 'primary',
    rounded = false,
    ...props
}: ButtonProps) => {
    const classNames = clsx(
        s.btn,
        {
            [s[size]]: size,
            [s[variant]]: variant,
            [s.rounded]: rounded,
        },
        [className],
    );

    if (href && !!href.length) {
        return (
            <Link className={classNames} to={href} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classNames} {...props}>
            {loading ? <Spin className={s.spinner} /> : ''}
            {children}
        </button>
    );
};
