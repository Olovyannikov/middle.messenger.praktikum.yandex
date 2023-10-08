import { Avatar, Button, Modal, Toast, Typography } from '@/shared/ui';
import { useState, VDom } from '@/jsx';
import { useDeleteChat } from '@/shared/hooks/chats/useDeleteChat.ts';
import { useGetAllChats } from '@/shared/hooks/chats/useGetAllChats.ts';
import { useActiveChat } from '@/store/Chats';
import s from './AppChatHeader.module.scss';

export const Header = () => {
    const [activeChat] = useActiveChat();
    const [isActionsVisible, setIsActionVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { chats } = useGetAllChats();
    const currentChat = chats?.find((chat) => activeChat === chat.id);
    const { toasts, isLoading, handleDeleteChat } = useDeleteChat({
        chat: currentChat,
    });

    const handleCloseModal = () => setIsModalOpen(false);
    const handleOpenModal = () => setIsModalOpen(true);

    const onDeleteChat = async () => {
        handleCloseModal();
        await handleDeleteChat();
    };

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
                                    handleOpenModal();
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
                open={isModalOpen}
                title="Удалить чат?"
                onClose={handleCloseModal}
            >
                <div className={s.controls}>
                    <Button
                        disabled={isLoading}
                        variant="info"
                        onClick={handleCloseModal}
                    >
                        Нет
                    </Button>
                    <Button disabled={isLoading} onClick={onDeleteChat}>
                        Да
                    </Button>
                </div>
            </Modal>
            <Toast toasts={toasts} />
        </>
    );
};