import { useForm } from '@/shared/hooks';
import { ChatsService } from '@/services/Chats/Chats.service.ts';
import { useState } from '@/jsx';
import { setChats } from '@/store/Chats';
import { ValidatorRequired } from '@/shared/schemas';

interface UseCreateNewChatProps {
    onClose(): void;
}

export const useCreateNewChat = ({ onClose }: UseCreateNewChatProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useForm<{
        title: string;
    }>({
        validators: {
            title: ValidatorRequired,
        },
        onSubmit: async () => {
            setIsLoading(true);
            try {
                await ChatsService.createChat(data.title);
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
    };
};