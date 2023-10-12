import { useState } from '@/jsx/hooks/useState.ts';
import { AuthService } from '@/services/Auth/Auth.service.ts';
import { useForm, type Validator } from '@/shared/hooks/useForm.ts';
import {
    ValidatorEmail,
    ValidatorPassword,
    ValidatorRequired,
} from '@/shared/schemas';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';
import { useToast } from '@/shared/ui/Toast/useToast.ts';

interface FormRegistration {
    first_name: string;
    second_name: string;
    login: string;
    phone: string;
    email: string;
    password: string;
    'repeat-password': string;
}

export const useRegistration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toasts, showToast } = useToast();

    const { errors, data, handleBlur, handleSubmit, handleChange } =
        useForm<FormRegistration>({
            validators: {
                first_name: ValidatorRequired,
                second_name: ValidatorRequired,
                login: ValidatorRequired,
                phone: ValidatorRequired,
                email: ValidatorEmail,
                password: ValidatorPassword,
                'repeat-password': {
                    isValid: (value) => value === data.password,
                    message: ' Пароли не совпадают',
                } as Validator,
            },
            initialValues: {},
            onSubmit: async () => {
                await AuthService.signup(data)
                    .then(() => {
                        window.location.replace('/messenger');
                    })
                    .catch((e) => {
                        if (isRMError(e)) {
                            showToast({
                                type: 'error',
                                title: 'Ошибка',
                                description: e?.reason ?? 'Произошла ошибка',
                                id: Math.random() * 100,
                            });
                        }
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            },
        });

    return {
        isLoading,
        errors,
        handleSubmit,
        handleChange,
        data,
        handleBlur,
        toasts,
    };
};