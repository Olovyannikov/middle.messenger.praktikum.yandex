import { useInput } from '@/shared/hooks';
import { ChatsService } from '@/services/Chats/Chats.service.ts';
import { useEffect, useState } from '@/jsx';
import { setChats } from '@/store/Chats';

interface UseCreateNewChatProps {
    onClose(): void;
}

export const useCreateNewChat = ({ onClose }: UseCreateNewChatProps) => {
    const [error, setError] = useState({
        title: '',
    });
    const { value, onChange } = useInput('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: Event) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await ChatsService.createChat(value);
        } finally {
            setIsLoading(false);
            onClose();
            await ChatsService.getChats({}).then((res) => {
                setChats.set(res.data);
            });
        }
    };

    const onBlur = () => {
        if (!value.length) {
            setError((prev) => ({
                ...prev,
                title: 'Введите название чата',
            }));
        } else {
            setError((prev) => ({
                ...prev,
                title: '',
            }));
        }
    };

    useEffect(() => {
        if (value.length) {
            setError((prev) => ({ ...prev, title: '' }));
        }
    }, [value]);

    return {
        value,
        isLoading,
        onChange,
        onBlur,
        onSubmit,
        error,
    };
};