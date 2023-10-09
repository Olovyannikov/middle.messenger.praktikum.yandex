import { useState, VDom } from '@/jsx';
import { useActiveChat } from '@/store/Chats';
import { Typography } from '@/shared/ui';

import { Header } from '@/entities/AppChat/ui/Header';
import { ChatBar } from '@/entities/AppChat/ui/ChatBar';
import s from './AppChat.module.scss';
import { Notifications } from '@/entities/AppChat/ui/Notifications';

export const AppChat = () => {
    const [activeChat] = useActiveChat();

    if (!activeChat) {
        return (
            <div className={s.empty}>
                <img src="/icons/comments.svg" alt="Выберите чат" />
                <Typography>Выберите чат</Typography>
            </div>
        );
    }

    const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
    const [isOpenDeleteChatModal, setIsOpenDeleteChatModal] = useState(false);
    const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);

    const handleOpenAddUserModal = () => setIsOpenAddUserModal(true);
    const handleOpenDeleteChatModal = () => setIsOpenDeleteChatModal(true);
    const handleOpenDeleteUserModal = () => setIsOpenDeleteUserModal(true);

    const handleCloseAddUserModal = () => setIsOpenAddUserModal(false);
    const handleCloseDeleteChatModal = () => setIsOpenDeleteChatModal(false);
    const handleCloseDeleteUserModal = () => setIsOpenDeleteUserModal(false);

    return (
        <>
            <section className={s.chat}>
                <Header
                    addUser={handleOpenAddUserModal}
                    deleteChat={handleOpenDeleteChatModal}
                    deleteUser={handleOpenDeleteUserModal}
                />
                <ChatBar />
            </section>
            <Notifications
                isAddUserOpen={isOpenAddUserModal}
                isDeleteChatOpen={isOpenDeleteChatModal}
                isDeleteUserOpen={isOpenDeleteUserModal}
                onAddUserClose={handleCloseAddUserModal}
                onDeleteChatClose={handleCloseDeleteChatModal}
                onDeleteUserClose={handleCloseDeleteUserModal}
            />
        </>
    );
};