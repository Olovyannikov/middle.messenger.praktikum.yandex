import { useLocation } from '@/shared/hooks/useLocation.ts';
import { useEffect, useState } from '@/jsx';

export const useParams = () => {
    const { replace, search } = useLocation();

    const getParams = () => {
        const urlSearchParams = new URLSearchParams(search);
        return Object.fromEntries(urlSearchParams.entries());
    };

    const [currentParam, setCurrentParam] = useState('');

    const setParams = (params: Record<string, string>) => {
        const stringfiedUrlSearchParams = new URLSearchParams(
            params,
        ).toString();
        replace(`?${stringfiedUrlSearchParams}`);
        setCurrentParam(stringfiedUrlSearchParams);
    };

    useEffect(() => {
        // setParams(getParams());
        setCurrentParam(getParams().chatId);
    }, [getParams().chatId]);

    return {
        getParams,
        setParams,
        currentParam,
    };
};
