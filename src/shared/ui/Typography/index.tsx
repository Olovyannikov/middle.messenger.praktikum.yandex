import {VDom} from "@/jsx";
import {classNames} from "@/shared/lib/clsx.ts"
import s from './styles.module.scss';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption' | 'overline';

interface TypographyProps<T extends ElementType> {
    as?: T;
    className?: string;
    children?: JSX.Element;
    variant?: TypographyVariant;
}

export const Typography = <T extends ElementType = 'p'>({as, children, className = '', variant = 'body1'}: TypographyProps<T>) => {

    let Tag = as ?? 'p';

    if (variant?.includes('h')) {
        Tag = variant;
    }

    return (
        <Tag
            className={classNames(s.text, {
                [s[variant]]: variant
            }, [className])}
        >{children}</Tag>
    )
}