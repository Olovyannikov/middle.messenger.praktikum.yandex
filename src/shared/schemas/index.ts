import { Validator } from '@/shared/hooks';

const regexps = {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
};

export const ValidatorRequired: Validator = {
    isValid: (value) => value.length > 0,
    message: 'Поле не может быть пустым',
};

export const ValidatorEmail: Validator = {
    isValid: (value) => regexps.email.test(value),
    message: 'Неверный email',
};

export const ValidatorPassword: Validator = {
    isValid: (value) => value.length > 0,
    message: 'Неверный пароль',
};