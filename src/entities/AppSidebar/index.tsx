import { useState, VDom } from '@/jsx';
import { ChatsList } from '@/widgets';
import { useGetAllChats } from '@/shared/hooks/chats/useGetAllChats.ts';
import { ChatsHeader } from '@/widgets/ChatsHeader';
import { Modal } from '@/shared/ui';
import { CreateNewChat } from '@/features/CreateNewChat';
import s from './AppSidebar.module.scss';

export const AppSidebar = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { chats } = useGetAllChats();

    const handleCloseModal = () => setIsOpenModal(false);

    return (
        <aside className={s.aside}>
            <ChatsHeader onOpenNewChatForm={() => setIsOpenModal(true)} />
            <ChatsList chats={chats} />
            <Modal open={isOpenModal} onClose={handleCloseModal}>
                <CreateNewChat onClose={handleCloseModal} />
            </Modal>
        </aside>
    );
};