import { useMemo } from '@/jsx/hooks/useMemo.ts';

export const useCallback = <T>(callback: T, deps: any[]): T => {
    return useMemo(() => callback, deps);
};