import { useState } from '@/jsx/hooks/useState.ts';
import { UserService } from '@/services/User/User.service.ts';
import { UserModel } from '@/shared/types/models/User';
import { AuthService } from '@/services/Auth/Auth.service.ts';
import { FormState } from '@/shared/types/Form.ts';
import { uploadFile } from '@/shared/lib/uploadFile.ts';
import { useUserStore } from '@/store/User';

export const useChangeProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [_, setUser] = useUserStore();

    const onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const formState: Record<string, FormState> = {};
        const preparedData: UserModel = {} as UserModel;

        for (const [name, value] of formData.entries()) {
            if (typeof value === 'string') {
                formState[name] = { value };
            }
        }

        Object.keys(formState).forEach((field) => {
            preparedData[field as keyof UserModel] = formState[field].value;
        });

        await UserService.changeUserData(preparedData)
            .then(() => {
                setIsLoading(true);
            })
            .finally(() => {
                setIsLoading(false);
                AuthService.getUser().then((res) => {
                    setUser.set(res.data);
                });
            });
    };

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

    return {
        isLoading,
        onSubmit,
        onAvatarChangeHandler,
    };
};