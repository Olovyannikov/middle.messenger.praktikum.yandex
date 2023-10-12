import { useActiveChat } from '@/store/Chats';
import { useForm } from '@/shared/hooks';
import { ValidatorRequired } from '@/shared/schemas';
import {
    useMessageStore,
    useWSMessenger,
} from '@/shared/hooks/chats/useWSMessenger.ts';

export const useSendNewMessage = () => {
    const [activeChat] = useActiveChat();
    const [messages] = useMessageStore();

    const { sendMessage, isLoading } = useWSMessenger(
        activeChat?.toString() ?? '',
    );
    const { data, handleChange, handleSubmit, reset } = useForm<{
        content: string;
    }>({
        validators: {
            content: ValidatorRequired,
        },
        onSubmit: async () => {
            await sendMessage(data.content);
            reset();
        },
        initialValues: {
            content: '',
        },
    });

    return {
        data,
        messages,
        isLoading,
        handleSubmit,
        handleChange,
    };
};