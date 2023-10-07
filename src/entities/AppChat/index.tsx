import { VDom } from '@/jsx';
import { useActiveChat } from '@/store/Chats';
import { Spin } from '@/shared/ui';

export const AppChat = () => {
    const [activeChat] = useActiveChat();

    if (!activeChat) {
        return <Spin />;
    }

    return <div>{activeChat}</div>;
};