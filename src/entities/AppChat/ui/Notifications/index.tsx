import { VDom } from '@/jsx';
import { Button, Input, Modal, Toast } from '@/shared/ui';
import { useNotificationsForm } from '@/entities/AppChat/ui/Notifications/useNotificationsForm.ts';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';
import s from './styles.module.scss';
import { classNames } from '@/shared/lib/clsx.ts';

interface NotificationsProps {
    isAddUserOpen: boolean;
    isDeleteChatOpen: boolean;
    isDeleteUserOpen: boolean;
    onAddUserClose: () => void;
    onDeleteChatClose: () => void;
    onDeleteUserClose: () => void;
}

export const Notifications = ({
    isAddUserOpen,
    isDeleteUserOpen,
    isDeleteChatOpen,
    onDeleteChatClose,
    onDeleteUserClose,
    onAddUserClose,
}: NotificationsProps) => {
    const {
        allToasts,
        isLoading,
        handleDeleteChat,
        handleUsersDeleteChange,
        handleDeleteUsersSubmit,
        usersData,
        allErrors,
        handleUserDeleteBlur,
        handleNewUserBlur,
        newUserData,
        handleNewUserChange,
        handleNewUserSubmit,
    } = useNotificationsForm({
        onCloseDeleteUser: onDeleteUserClose,
        onCloseAddUser: onAddUserClose,
    });
    const onDeleteChat = async () => {
        try {
            await handleDeleteChat();
            onDeleteChatClose();
        } catch (e: unknown) {
            if (isRMError(e)) {
                throw new Error('Ошибка при удалении чата');
            }
        }
    };

    return (
        <>
            <Modal
                title="Добавить пользователя"
                open={isAddUserOpen}
                onClose={onAddUserClose}
            >
                <form
                    onSubmit={handleNewUserSubmit}
                    className={classNames(s.form, {}, [s.full])}
                >
                    <Input
                        name="chats"
                        onInput={handleNewUserChange('chats')}
                        label="ID пользователя"
                        value={newUserData.chats}
                        error={allErrors['chats']}
                        onBlur={handleNewUserBlur('chats')}
                    />
                    <Button type="submit">Добавить</Button>
                </form>
            </Modal>
            <Modal
                title="Удалить пользователя"
                open={isDeleteUserOpen}
                onClose={onDeleteUserClose}
            >
                <form
                    className={classNames(s.form, {}, [s.full])}
                    onSubmit={handleDeleteUsersSubmit}
                >
                    <Input
                        name="users"
                        label="ID пользователя"
                        onInput={handleUsersDeleteChange('users')}
                        error={allErrors['users']}
                        value={usersData.users}
                        onBlur={handleUserDeleteBlur('users')}
                    />
                    <Button type="submit">Удалить</Button>
                </form>
            </Modal>
            <Modal
                title="Удалить чат"
                open={isDeleteChatOpen}
                onClose={onDeleteChatClose}
            >
                <div className={s.form}>
                    <Button disabled={isLoading} variant="text">
                        Нет
                    </Button>
                    <Button
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={onDeleteChat}
                    >
                        Да
                    </Button>
                </div>
            </Modal>
            <Toast toasts={allToasts} />
        </>
    );
};