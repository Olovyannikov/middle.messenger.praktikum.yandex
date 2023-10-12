import { setChatUsers, useUserStore } from '@/store/User';
import { WEBSOCKET_URL } from '@/services/config.ts';
import { createStore, useEffect, useState } from '@/jsx';
import { ChatsService } from '@/services/Chats/Chats.service.ts';
import { setActiveChat, setChats } from '@/store/Chats';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';
import { useParams } from '@/shared/hooks';

export interface ChatMessage {
    chat_id: number;
    content: string;
    file: null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}

export const {
    use: useMessageStore,
    set: setMessageStore,
    update: updateMessageStore,
} = createStore<ChatMessage[]>([]);

export const useWSMessenger = (chatId: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [offset, setOffset] = useState<number>(0);
    const [user] = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const { setParams } = useParams();

    useEffect(() => {
        // Установка веб-сокет соединения при монтировании компонента
        const connectSocket = async () => {
            const tokenData = await ChatsService.connectToChat(chatId);

            try {
                const getChatUsers = await ChatsService.getChatUsers(chatId);

                if (getChatUsers.status === 200) {
                    setToken(tokenData.data.token);
                    setChatUsers(getChatUsers.data);
                }
            } catch {
                setParams({
                    chat: '',
                });
                setActiveChat('');
            }

            const websocketAddress = `${WEBSOCKET_URL}/chats/${user.id}/${chatId}/${tokenData.data.token}`;
            const ws = new WebSocket(websocketAddress);

            ws.onopen = () => {
                // Отправляем сообщение {type: 'ping'} для поддержания связи
                ws.send(JSON.stringify({ type: 'ping' }));
                ws.send(
                    JSON.stringify({
                        content: offset.toString(),
                        type: 'get old',
                    }),
                );

                const ping = setInterval(() => {
                    ws.send(JSON.stringify({ type: 'ping' }));
                    ws.send(
                        JSON.stringify({
                            content: offset.toString(),
                            type: 'get old',
                        }),
                    );
                }, 5000);

                if (socket?.readyState === socket?.CLOSED) {
                    clearInterval(ping);
                }
            };

            ws.onmessage = async (event) => {
                try {
                    const data = JSON.parse(event.data);

                    // Обрабатываем входящее сообщение и добавляем его к текущему списку сообщений
                    if (data.type === 'message' || Array.isArray(data)) {
                        if (Array.isArray(data)) {
                            setMessageStore(data);
                        } else {
                            ws.send(
                                JSON.stringify({
                                    type: 'get old',
                                    content: offset,
                                }),
                            );
                        }
                        setOffset((prev) => {
                            if (prev) {
                                return prev++;
                            }

                            return 0;
                        });
                    }

                    if (!data.type) {
                        await ChatsService.getChats({}).then((res) => {
                            setChats(res.data);
                        });
                    }
                } catch (e: unknown) {
                    if (isRMError(e)) {
                        throw new Error(
                            e?.reason ?? 'Произошла ошибка useWSMessenger.ts',
                        );
                    }
                }
            };

            setSocket(ws);
        };

        connectSocket();

        // Закрытие веб-сокет соединения при размонтировании компонента
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [chatId]);

    // Функция для отправки текстовых сообщений
    const sendMessage = async (messageContent: string) => {
        setIsLoading(true);
        try {
            if (socket && token) {
                const message = {
                    content: messageContent,
                    type: 'message',
                };
                socket.send(JSON.stringify(message));
                socket.send(
                    JSON.stringify({
                        type: 'get old',
                        content: offset,
                    }),
                );
            }
        } catch {
            throw new Error('Ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    // Вызываем функцию для получения первых 20 непрочитанных сообщений
    useEffect(() => {
        setMessageStore([]);
        socket?.close();
    }, [chatId]);

    return {
        sendMessage,
        isLoading,
    };
};