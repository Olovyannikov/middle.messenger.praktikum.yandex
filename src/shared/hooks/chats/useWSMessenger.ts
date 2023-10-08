import { useUserStore } from '@/store/User';
import { WEBSOCKET_URL } from '@/services/config.ts';
import { useEffect, useState } from '@/jsx';
import { ChatsService } from '@/services/Chats/Chats.service.ts';
import { setChats } from '@/store/Chats';

interface ChatMessage {
    chat_id: number;
    content: string;
    file: null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}

export const useWSMessenger = (chatId: string) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [offset, setOffset] = useState<number>(0);
    const [user] = useUserStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Установка веб-сокет соединения при монтировании компонента
        const connectSocket = async () => {
            const tokenData = await ChatsService.connectToChat(chatId);
            setToken(tokenData.data.token);
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
                }, 30000);

                if (socket?.readyState === socket?.CLOSED) {
                    clearInterval(ping);
                }
            };

            ws.onmessage = async (event) => {
                const data = JSON.parse(event.data);

                if (data.type) {
                    return;
                }
                // Обрабатываем входящее сообщение и добавляем его к текущему списку сообщений
                setMessages(data);
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
                const newMessages = await ChatsService.getChats({});
                setChats(newMessages.data);
            }
        } catch {
            throw new Error('Ошибка');
        } finally {
            setIsLoading(false);
        }
    };

    // Функция для получения старых сообщений
    const getOldMessages = async () => {
        if (socket?.readyState === socket?.OPEN && token) {
            const message = {
                content: offset.toString(),
                type: 'get old',
            };
            socket?.send(JSON.stringify(message));
            setOffset((prevOffset) => {
                if (prevOffset) {
                    return prevOffset + 20;
                }

                return 0;
            });
        }
        socket?.addEventListener('message', (e) => {
            const msg = JSON.parse(e.data);
            if (msg.type === 'message') {
                setMessages(msg);
            }
        });
    };

    // Вызываем функцию для получения первых 20 непрочитанных сообщений
    // useEffect(() => {
    //     setMessages([]);
    // }, [chatId]);

    return {
        messages,
        sendMessage,
        getOldMessages,
        isLoading,
    };
};