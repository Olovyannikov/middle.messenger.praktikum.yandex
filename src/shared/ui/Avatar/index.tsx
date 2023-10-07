import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';
import { isNumber } from '@/shared/types/type-guards/isNumber.ts';
import s from './Avatar.module.scss';

interface AvatarProps {
    src?: string;
    alt?: string;
    className?: string;
    bgColor?: string;
    color?: string;
    rounded?: boolean;
    size?: 'small' | 'medium' | 'large' | number;
    square?: boolean;
    children?: JSX.Element;
}

export const Avatar = ({
    src,
    alt,
    className = '',
    children,
    color = 'var(--white)',
    bgColor = 'var(--line)',
    size = 'medium',
    square = false,
    rounded = false,
}: AvatarProps) => {
    return (
        <div
            className={classNames(
                s.avatar,
                {
                    [s[size]]: !!size,
                    [s.rounded]: rounded,
                    [s.square]: square,
                },
                [className],
            )}
            style={{
                backgroundColor: bgColor,
                color,
                ...(isNumber(size)
                    ? { width: size.toString(), height: size.toString() }
                    : null),
            }}
        >
            {src && <img src={src} alt={alt} />}
            {children}
        </div>
    );
};