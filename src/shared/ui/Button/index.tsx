import { VDom } from '@/jsx';
import { Link } from '@/shared/ui/Link';
import { classNames as clsx } from '@/shared/lib/clsx.ts';
import s from './styles.module.scss';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonType = 'submit' | 'button';
type ButtonVariant = 'primary' | 'secondary' | 'text';

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    children?: JSX.Element;
    size?: ButtonSize;
    type?: ButtonType;
    variant?: ButtonVariant;
    disabled?: boolean;
    className?: string;
    hash?: boolean;
}

export const Button = ({
    children,
    disabled,
    onClick,
    className = '',
    href,
    hash,
    size = 'medium',
    type = 'button',
    variant = 'primary',
}: ButtonProps) => {
    const classNames = clsx(
        s.btn,
        {
            [s[size]]: size,
            [s[variant]]: variant,
        },
        [className],
    );

    if (href && !!href.length) {
        return (
            <Link
                asRoute={hash}
                className={classNames}
                disabled={disabled}
                href={href}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classNames}
            {...(onClick && { onClick })}
        >
            {children}
        </button>
    );
};
