import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';

import s from './styles.module.scss';

export interface InputProps extends JSX.HtmlInputTag {
    label?: string;
    full?: boolean;
    message?: string;
    error?: string;
    value?: string;
    size?: 'small' | 'medium' | 'large';
}

export const Input = ({
    error = '',
    type = 'text',
    full = false,
    className = '',
    placeholder = ' ',
    label,
    size = 'medium',
    value = '',
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
                    [s.error]: !!error,
                    [s[size]]: size,
                },
                [className],
            )}
        >
            <input
                className={classNames(s.input, {
                    [s.error]: !!error,
                })}
                required={required}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                {...props}
            />
            <span className={s.title}>{label}</span>

            {error && <span className={s.error}>{error}</span>}
        </label>
    );
};
