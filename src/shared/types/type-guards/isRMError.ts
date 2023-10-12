import { isObject } from '@/shared/types/type-guards/isObject.ts';

interface RMError {
    reason: string;
}

export function isRMError(error: unknown): error is RMError {
    return isObject(error) && 'reason' in (error as object);
}