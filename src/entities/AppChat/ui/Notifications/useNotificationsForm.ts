import { useDeleteChat } from '@/shared/hooks/chats/useDeleteChat.ts';
import { useActiveChat, useChatsStore } from '@/store/Chats';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';
import { ChatsService } from '@/services/Chats/Chats.service.ts';
import { ValidatorRequired } from '@/shared/schemas';
import { useForm } from '@/shared/hooks';
import { useToast } from '@/shared/ui/Toast/useToast.ts';

interface UseNotificationsFormProps {
    onCloseDeleteUser: () => void;
    onCloseAddUser: () => void;
}

export const useNotificationsForm = ({
    onCloseDeleteUser,
    onCloseAddUser,
}: UseNotificationsFormProps) => {
    const [activeChat] = useActiveChat();
    const [chats] = useChatsStore();
    const currentChat = chats?.find((chat) => activeChat === chat.id);
    const { showToast, toasts } = useToast();

    const {
        toasts: deleteToasts,
        isLoading: isDeleteLoading,
        handleDeleteChat,
    } = useDeleteChat({
        chat: currentChat,
    });

    const {
        data: usersData,
        handleChange: handleUsersDeleteChange,
        handleSubmit: handleDeleteUsersSubmit,
        errors: deleteUserErrors,
        handleBlur: handleUserDeleteBlur,
        reset: handleUserDeleteReset,
    } = useForm<{
        users: string;
    }>({
        initialValues: {
            users: '',
        },
        validators: {
            users: ValidatorRequired,
        },
        onSubmit: async () => {
            try {
                if (usersData.users) {
                    const res = await ChatsService.removeUserFromChat({
                        chatId: Number(activeChat),
                        users: [Number(usersData.users)],
                    });

                    if (res.status === 200) {
                        onCloseDeleteUser();
                        handleUserDeleteReset();

                        showToast({
                            id: Date.now(),
                            title: 'Успех',
                            description: `Пользователь ${usersData.users} удален`,
                        });
                    }
                }
            } catch (e: unknown) {
                if (isRMError(e)) {
                    showToast({
                        type: 'error',
                        title: 'Ошибка!',
                        description: e?.reason || 'Произошла ошибка',
                        id: Date.now(),
                    });
                }
            }
        },
    });

    const {
        data: newUserData,
        errors: newUserErrors,
        handleChange: handleNewUserChange,
        handleSubmit: handleNewUserSubmit,
        reset: handleNewUserReset,
        handleBlur: handleNewUserBlur,
    } = useForm<{
        chats: string;
    }>({
        initialValues: {
            chats: '',
        },
        validators: {
            chats: ValidatorRequired,
        },
        onSubmit: async () => {
            try {
                if (newUserData.chats && activeChat) {
                    const res = await ChatsService.addUserToChat({
                        users: [Number(newUserData.chats)],
                        chatId: Number(activeChat),
                    });

                    if (res.status === 200) {
                        onCloseAddUser();
                        showToast({
                            id: Date.now(),
                            title: 'Успех',
                            description: `Пользователь ${newUserData.chats} добавлен`,
                        });
                        handleNewUserReset();
                    }
                }
            } catch (e: unknown) {
                if (isRMError(e)) {
                    showToast({
                        type: 'error',
                        title: 'Ошибка!',
                        description: e?.reason || 'Произошла ошибка',
                        id: Date.now(),
                    });
                }
            }
        },
    });

    const allToasts = [...deleteToasts, ...toasts];
    const isLoading = isDeleteLoading;
    const allErrors = { ...deleteUserErrors, ...newUserErrors };

    return {
        allToasts,
        allErrors,
        isLoading,
        handleDeleteChat,
        usersData,
        handleDeleteUsersSubmit,
        handleUsersDeleteChange,
        handleUserDeleteBlur,
        newUserData,
        handleNewUserBlur,
        handleNewUserChange,
        handleNewUserSubmit,
    };
};