import { emailRegExp } from '@/shared/constants/email.ts';

export const checkEmail = (input: string) => {
    emailRegExp.test(input.trim());
};
