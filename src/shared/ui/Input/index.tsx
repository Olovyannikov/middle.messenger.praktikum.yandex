import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';

import s from './styles.module.scss';

export interface InputProps {
    title?: string;
    full?: boolean;
    message?: string;
    errors?: boolean;
    type?: 'text' | 'password';
    className?: string;
    placeholder?: string;
}

export const Input = ({
    message,
    errors,
    type = 'text',
    full = false,
    className = '',
    placeholder = ' ',
    title,
    ...props
}: InputProps) => {
    return (
        <label
            className={classNames(
                s.label,
                {
                    [s.full]: !!full,
                    [s.error]: !!errors,
                },
                [className],
            )}
        >
            <input
                className={classNames(s.input, {
                    [s.error]: !!errors,
                })}
                type={type}
                {...props}
                placeholder={placeholder}
            />
            <span className={s.title}>{title}</span>
        </label>
    );
};
