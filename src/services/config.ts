import { Axios, AxiosRequestConfig } from '@/shared/lib/axios.ts';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

const defaultConfig: AxiosRequestConfig<Axios['defaultConfig']> = {
    baseURL: BASE_URL,
    url: '',
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'GET',
    withCredentials: true,
};

export const axios = new Axios(defaultConfig);
