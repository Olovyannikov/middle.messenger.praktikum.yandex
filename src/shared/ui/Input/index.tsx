import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';

import s from './styles.module.scss';

export interface InputProps {
    title?: string;
    full?: boolean;
    message?: string;
    errors?: boolean;
    type?: 'text' | 'password' | 'email';
    className?: string;
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    name?: string;
    required?: boolean;
}

export const Input = ({
    message,
    errors,
    type = 'text',
    full = false,
    className = '',
    placeholder = ' ',
    title,
    size = 'medium',
    name,
    required = false,
    ...props
}: InputProps) => {
    return (
        <label
            className={classNames(
                s.label,
                {
                    [s.full]: !!full,
                    [s.error]: !!errors,
                    [s[size]]: size,
                },
                [className],
            )}
        >
            <input
                className={classNames(s.input, {
                    [s.error]: !!errors,
                })}
                required={required}
                type={type}
                placeholder={placeholder}
                name={name}
                {...props}
            />
            <span className={s.title}>{title}</span>
        </label>
    );
};
