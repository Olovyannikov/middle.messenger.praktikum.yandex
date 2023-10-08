import { Avatar, Button, Input, Modal, Toast, Typography } from '@/shared/ui';
import { useState, VDom } from '@/jsx';
import { useDeleteChat } from '@/shared/hooks/chats/useDeleteChat.ts';
import { useActiveChat, useChatsStore } from '@/store/Chats';
import { useForm } from '@/shared/hooks';
import { ValidatorRequired } from '@/shared/schemas';
import { ChatsService } from '@/services/Chats/Chats.service.ts';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';
import { useToast } from '@/shared/ui/Toast/useToast.ts';
import s from './AppChatHeader.module.scss';

export const Header = () => {
    const [activeChat] = useActiveChat();
    const [isActionsVisible, setIsActionVisible] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isDeleteUserModalOpen, setIsDeleteUserModelOpen] = useState(false);
    const [chats] = useChatsStore();
    const currentChat = chats?.find((chat) => activeChat === chat.id);

    const { toasts, isLoading, handleDeleteChat } = useDeleteChat({
        chat: currentChat,
    });

    const { toasts: addNewToasts, showToast } = useToast();

    const { data, errors, handleChange, handleSubmit } = useForm<{
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
                if (data.chats && activeChat) {
                    await ChatsService.addUserToChat({
                        users: [Number(data.chats)],
                        chatId: Number(activeChat),
                    });
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
            } finally {
                handleCloseAddUserModal();
            }
        },
    });

    const {
        data: usersData,
        handleChange: handleUsersDeleteChange,
        handleSubmit: handleDeleteUsersSubmit,
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
                    await ChatsService.removeUserFromChat({
                        chatId: Number(activeChat),
                        users: [Number(usersData.users)],
                    });
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
            } finally {
                handleCloseDeleteUserModal();
            }
        },
    });

    const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
    const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);

    const onDeleteChat = async () => {
        handleCloseDeleteModal();
        await handleDeleteChat();
    };

    const handleCloseAddUserModal = () => setIsAddUserModalOpen(false);
    const handleOpenAddUserModal = () => setIsAddUserModalOpen(true);

    const handleCloseDeleteUserModal = () => setIsDeleteUserModelOpen(false);
    const handleOpenDeleteUserModal = () => setIsDeleteUserModelOpen(true);

    return (
        <>
            <header className={s.header}>
                {isActionsVisible && (
                    <div
                        className={s.overlay}
                        role="presentation"
                        onclick={() => setIsActionVisible(false)}
                    />
                )}
                <Avatar src={currentChat?.avatar} />
                <Typography>{currentChat?.title}</Typography>
                <Button
                    className={s.menu}
                    variant="text"
                    size="small"
                    onClick={() => setIsActionVisible(!isActionsVisible)}
                />
                {isActionsVisible && (
                    <ul className={s.actions}>
                        <li>
                            <button
                                onClick={() => {
                                    setIsActionVisible(false);
                                    handleOpenAddUserModal();
                                }}
                            >
                                Добавить пользователя
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setIsActionVisible(false);
                                    handleOpenDeleteUserModal();
                                }}
                            >
                                Удалить пользователя
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setIsActionVisible(false);
                                    handleOpenDeleteModal();
                                }}
                            >
                                Удалить чат
                            </button>
                        </li>
                    </ul>
                )}
            </header>
            <Modal
                className={s.modal}
                open={isDeleteModalOpen}
                title="Удалить чат?"
                onClose={handleCloseDeleteModal}
            >
                <div className={s.controls}>
                    <Button
                        disabled={isLoading}
                        variant="info"
                        onClick={handleCloseDeleteModal}
                    >
                        Нет
                    </Button>
                    <Button disabled={isLoading} onClick={onDeleteChat}>
                        Да
                    </Button>
                </div>
            </Modal>

            <Modal
                className={s.modal}
                open={isAddUserModalOpen}
                title="Добавление нового пользователя"
                onClose={handleCloseAddUserModal}
            >
                <form onSubmit={handleSubmit} className={s.addUser}>
                    <Input
                        label="Новый пользователь"
                        name="chats"
                        value={data.chats}
                        onInput={handleChange('chats')}
                        error={errors['chats']}
                    />
                    <Button type="submit" disabled={isLoading}>
                        Добавить
                    </Button>
                </form>
            </Modal>

            <Modal
                className={s.modal}
                open={isDeleteUserModalOpen}
                title="Удаление пользователя"
                onClose={handleCloseDeleteUserModal}
            >
                <form onSubmit={handleDeleteUsersSubmit} className={s.addUser}>
                    <Input
                        label="ID пользователя"
                        name="users"
                        value={usersData.users}
                        onInput={handleUsersDeleteChange('users')}
                    />
                    <Button type="submit">Удалить</Button>
                </form>
            </Modal>
            <Toast toasts={toasts} />
            <Toast toasts={addNewToasts} />
        </>
    );
};