import { Validator } from '@/shared/hooks';

const regexps = {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,15})$/,
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
    isValid: (value) => regexps.password.test(value),
    message: 'Неверный пароль',
};