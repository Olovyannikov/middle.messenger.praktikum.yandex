import { useEffect } from '@/jsx';

export const useClickOutside = (id: string, callback: () => void) => {
    const handleClick = (event: MouseEvent) => {
        const ref = document.getElementById(id);
        if (ref && !ref.contains(event.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
};
