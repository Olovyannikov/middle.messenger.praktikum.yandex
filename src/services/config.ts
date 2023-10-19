import { Axios } from '@/shared/lib/axios/axios.ts';

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const WEBSOCKET_URL = 'wss://ya-praktikum.tech/ws';

export const axios = new Axios({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});