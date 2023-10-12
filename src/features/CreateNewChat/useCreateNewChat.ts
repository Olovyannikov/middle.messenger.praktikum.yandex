import { useForm } from '@/shared/hooks';
import { ChatsService } from '@/services/Chats/Chats.service.ts';
import { useState } from '@/jsx';
import { setChats } from '@/store/Chats';
import { ValidatorRequired } from '@/shared/schemas';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';
import { useToast } from '@/shared/ui/Toast/useToast.ts';

interface UseCreateNewChatProps {
    onClose(): void;
}

export const useCreateNewChat = ({ onClose }: UseCreateNewChatProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast, toasts } = useToast();

    const { data, errors, reset, handleSubmit, handleChange, handleBlur } =
        useForm<{
            title: string;
        }>({
            validators: {
                title: ValidatorRequired,
            },
            onSubmit: async () => {
                setIsLoading(true);
                try {
                    const res = await ChatsService.createChat(data.title);
                    if (res.status === 200) {
                        showToast({
                            title: 'Успех',
                            description: `Чат ${data.title} успешно создан`,
                            id: Date.now(),
                            type: 'success',
                        });
                        reset();
                    }

                    if (res.status !== 200) {
                        showToast({
                            title: 'Ошибка',
                            description: 'Произошла ошибка при создании чата',
                            id: Date.now(),
                            type: 'error',
                        });
                    }
                } catch (e) {
                    if (isRMError(e)) {
                        showToast({
                            title: 'Ошибка!',
                            description:
                                e?.reason ??
                                'Произошла ошибка при создании чата',
                            id: Date.now(),
                        });
                    }
                } finally {
                    setIsLoading(false);
                    onClose();
                    await ChatsService.getChats({}).then((res) => {
                        setChats(res.data);
                    });
                }
            },
        });

    return {
        data,
        handleBlur,
        handleSubmit,
        handleChange,
        errors,
        isLoading,
        toasts,
    };
};