import type { LoginForm } from '@/shared/types/Form.ts';
import { AuthService } from '@/services/Auth/Auth.service.ts';
import { useState } from '@/jsx/hooks/useState.ts';
import { useForm } from '@/shared/hooks/useForm.ts';
import { ValidatorPassword, ValidatorRequired } from '@/shared/schemas';
import { useToast } from '@/shared/ui/Toast/useToast.ts';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toasts, showToast } = useToast();

    const { errors, data, handleSubmit, handleBlur, handleChange } =
        useForm<LoginForm>({
            validators: {
                login: ValidatorRequired,
                password: ValidatorPassword,
            },
            initialValues: {
                password: '',
                login: '',
            },
            onSubmit: async () => {
                setIsLoading(true);
                try {
                    await AuthService.signin(data);
                    window.location.replace('/messenger');
                } catch (e: unknown) {
                    if (isRMError(e)) {
                        showToast({
                            id: Math.random() * 100,
                            title: 'Ошибка!',
                            description: e?.reason ?? 'Произошла ошибка',
                            type: 'error',
                        });
                    }
                } finally {
                    setIsLoading(false);
                }
            },
        });

    return {
        toasts,
        isLoading,
        errors,
        data,
        handleSubmit,
        handleChange,
        handleBlur,
    };
};