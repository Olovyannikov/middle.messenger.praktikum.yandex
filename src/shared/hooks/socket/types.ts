export declare type onOpenFunc = (data: unknown | never) => void;
export declare type onCloseFunc = (data: unknown | never) => void;
export declare type onErrorFunc = (data: unknown | never) => void;
export declare type onMessageFunc<T extends ISocketJSONType> = (
    data: unknown | never,
    json: T,
) => void;
export declare type ISocketJSONType = Record<never, never>;

export enum READY_STATE {
    CONNECTING = 0,
    OPEN = 1,
    CLOSING = 2,
    CLOSED = 3,
}

export interface SocketProps {
    url?: string;
    wss?: boolean;
    disconnectOnUnmount?: boolean;
}

export interface SocketEvents<T extends ISocketJSONType> {
    onOpen?: onOpenFunc;
    onClose?: onCloseFunc;
    onError?: onErrorFunc;
    onMessage?: onMessageFunc<T>;
}

export interface ISocketContext extends SocketProps {
    connect: (params: { path: string }) => WebSocket;
}

export interface SocketState<T extends ISocketJSONType> {
    readyState: READY_STATE;
    lastData?: T;
}

export interface SocketResponse<T extends ISocketJSONType>
    extends SocketState<T> {
    connect: (params?: IConnect<T>) => WebSocket;
    socket: WebSocket;
    sendData: (data: T) => void;
}

export interface IConnect<T extends ISocketJSONType>
    extends SocketEvents<T>,
        SocketProps {
    endpoint?: string;
}