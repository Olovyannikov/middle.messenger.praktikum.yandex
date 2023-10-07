import { useState } from '@/jsx/hooks/useState.ts';
import { UserService } from '@/services/User/User.service.ts';
import { UserModel } from '@/shared/types/models/User';
import { AuthService } from '@/services/Auth/Auth.service.ts';
import { uploadFile } from '@/shared/lib/uploadFile.ts';
import { useUserStore } from '@/store/User';
import { useForm } from '@/shared/hooks/useForm.ts';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';
import { useToast } from '@/shared/ui/Toast/useToast.ts';
import { ValidatorEmail, ValidatorRequired } from '@/shared/schemas';

export const useChangeProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useUserStore();
    const { toasts, showToast } = useToast();

    const { data, errors, handleBlur, handleChange, handleSubmit } =
        useForm<UserModel>({
            initialValues: {
                first_name: user?.first_name,
                second_name: user?.second_name,
                display_name: user?.display_name,
                login: user?.login,
                email: user?.email,
                phone: user?.phone,
            },
            validators: {
                first_name: ValidatorRequired,
                second_name: ValidatorRequired,
                login: ValidatorRequired,
                email: ValidatorEmail,
                phone: ValidatorRequired,
            },
            onSubmit: async () => {
                console.log(data);
                setIsLoading(true);
                try {
                    const newUserData = await UserService.changeUserData(data);
                    if (newUserData.status === 200) {
                        setUser.update(data);
                        showToast({
                            id: Math.random() * 100,
                            title: 'Успех!',
                            description: 'Данные успешно обновлены',
                            type: 'success',
                        });
                    }
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

    const onAvatarChangeHandler = async (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLInputElement;
        const files = form.files;
        const formData = new FormData();

        if (files) {
            formData.append('avatar', files[0]);
            uploadFile(files[0]).then(() => {
                AuthService.getUser().then((user) => {
                    setUser.update(user.data);
                });
            });
        }
    };

    const logout = () => {
        AuthService.logout().then(() => {
            window.location.pathname = '/';
        });
    };

    return {
        isLoading,
        onSubmit: handleSubmit,
        onAvatarChangeHandler,
        logout,
        errors,
        handleChange,
        handleBlur,
        data,
        toasts,
        user,
    };
};