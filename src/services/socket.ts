import { WEBSOCKET_URL } from '@/services/config.ts';

export type WSTransportOptions = Partial<{
    onOpen: (event: Event) => void;
    onError: (event: Event) => void;
    onMessage: (event: MessageEvent) => void;
    onClose: (event: CloseEvent) => void;
}>;

export class WebSocketTransport {
    protected socket: WebSocket;

    private _options: WSTransportOptions | undefined;

    constructor(url: string, options?: WSTransportOptions) {
        this._options = options;
        this.socket = new WebSocket(`${WEBSOCKET_URL}${url}`);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
    }

    protected onOpen(event: Event): void {
        this._options?.onOpen?.(event);
    }

    protected onClose(event: CloseEvent): void {
        this._options?.onClose?.(event);
    }

    protected onError(event: Event): void {
        this._options?.onError?.(event);
    }

    protected onMessage(event: MessageEvent): void {
        this._options?.onMessage?.(event);
    }

    public send(data: string): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(data);
        } else {
            console.error('WebSocket connection is not open.');
        }
    }

    public close(): void {
        this.socket.close();
    }
}