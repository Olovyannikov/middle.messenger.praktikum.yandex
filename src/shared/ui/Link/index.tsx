import {VDom} from "@/jsx";
import {classNames} from "@/shared/lib/clsx.ts";
import s from './styles.module.scss';

interface LinkProps {
    href: string;
    children?: JSX.Element;
    className?: string;
    disabled?: boolean;
}

export const Link = ({href, className = '', disabled = false, children}: LinkProps) => {

    return (
        <a aria-disabled={disabled} href={href} data-link={true} className={classNames(s.link, {}, [className])}>{children}</a>
    )
}