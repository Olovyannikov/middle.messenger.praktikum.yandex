import { VDom } from '@/jsx';
import { classNames } from '@/shared/lib/clsx.ts';

export interface LinkProps {
    to: string;
    className?: string;
    children?: JSX.Element;
}

export const Link = ({ to, children, className = '' }: LinkProps) => {
    const preventReload = (event: Event) => {
        event.preventDefault();
        window.history.pushState({}, '', to);
        const navigationEvent = new PopStateEvent('navigate');
        window.dispatchEvent(navigationEvent);
    };

    return (
        <a
            href={to}
            onClick={preventReload}
            className={classNames('', {}, [className])}
        >
            {children}
        </a>
    );
};