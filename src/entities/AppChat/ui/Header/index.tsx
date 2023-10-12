import { Avatar, Button, Spin, Typography } from '@/shared/ui';
import { useState, VDom } from '@/jsx';
import { setChats, useActiveChat, useChatsStore } from '@/store/Chats';
import s from './AppChatHeader.module.scss';
import { uploadFile } from '@/shared/lib/uploadFile.ts';
import { ChatsService } from '@/services/Chats/Chats.service.ts';
import { avatarTitle } from '@/shared/lib/getAvatarTitle.ts';

interface HeaderProps {
    addUser: () => void;
    deleteUser: () => void;
    deleteChat: () => void;
}

export const Header = ({ addUser, deleteUser, deleteChat }: HeaderProps) => {
    const [activeChat] = useActiveChat();
    const [isActionsVisible, setIsActionVisible] = useState(false);
    const [chats] = useChatsStore();
    const currentChat = chats?.find((chat) => activeChat === chat.id);
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeChatAvatar = (e: Event) => {
        setIsLoading(true);
        const form = e.target as HTMLInputElement;
        const files = form.files;
        const formData = new FormData();

        if (files) {
            formData.append('avatar', files[0]);
            uploadFile(files[0], '/chats/avatar', 'avatar', {
                chatId: activeChat?.toString() ?? '',
            })
                .then(() => {
                    ChatsService.getChats({}).then((res) => setChats(res.data));
                })
                .finally(() => setIsLoading(false));
        }
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
                <label className={s.avatar}>
                    <Avatar
                        baseUrl="https://ya-praktikum.tech/api/v2/resources/"
                        src={currentChat?.avatar}
                    >
                        {isLoading ? <Spin /> : avatarTitle(currentChat?.title)}
                    </Avatar>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleChangeChatAvatar}
                    />
                </label>
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
                                    addUser();
                                }}
                            >
                                Добавить пользователя
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setIsActionVisible(false);
                                    deleteUser();
                                }}
                            >
                                Удалить пользователя
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    setIsActionVisible(false);
                                    deleteChat();
                                }}
                            >
                                Удалить чат
                            </button>
                        </li>
                    </ul>
                )}
            </header>
        </>
    );
};