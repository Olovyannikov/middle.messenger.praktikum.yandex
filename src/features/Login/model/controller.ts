import { FormState } from '@/shared/types/Form.ts';
import { AuthService } from '@/services/Auth/Auth.service.ts';
import { AuthSignInRequest } from '@/services/Auth/Auth.dto.ts';
import { toast } from '@/shared/ui/Toast/ToastManager.tsx';

export const onSubmitHandler = async (e: MouseEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formState: Record<string, FormState> = {};
    const preparedData: AuthSignInRequest = {} as AuthSignInRequest;

    for (const [name, value] of formData.entries()) {
        if (typeof value === 'string') {
            formState[name] = { value };
        }
    }

    Object.keys(formState).forEach((field) => {
        preparedData[field as keyof AuthSignInRequest] = formState[field].value;
    });

    await AuthService.signin(preparedData)
        .then(() => {
            window.location.replace('/chats');
        })
        .catch((e) => {
            toast.show({
                title: 'Ошибка',
                content: JSON.parse(e.response.data).reason,
                duration: 3000,
            });
        });
};