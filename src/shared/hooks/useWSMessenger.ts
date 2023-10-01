import { useUserStore } from '@/store/User';
import { WEBSOCKET_URL } from '@/services/config.ts';
import { useEffect } from '@/jsx';
import { useParams } from '@/shared/hooks/useParams.ts';

const chatWSconnect = {
    baseWS: `${WEBSOCKET_URL}/chats/`,
};

interface UseWSMessengerProps {
    chatID: string | number;
    token: string;
}

export const useWSMessenger = ({ chatID }: UseWSMessengerProps) => {
    const [user] = useUserStore();
    const { getParams } = useParams();
    // TODO: get ws interfaces
    // const [messages, setMessages] = useState<any>();

    const socket = new WebSocket(
        `${chatWSconnect.baseWS}${user.id}/${chatID}/${getParams().token}`,
    );

    const send = (data: string) => {
        console.log('hre tok', getParams().token);
        if (socket.readyState === WebSocket.OPEN) {
            return socket.send(data);
        }
        throw new Error('Websocket connection lost');
    };

    const pingpong = () =>
        setInterval(() => {
            send(
                JSON.stringify({
                    type: 'ping',
                }),
            );
        }, 5000);

    useEffect(() => {
        pingpong();

        return () => pingpong();
    }, [getParams()]);

    return {
        send,
    };
};