export interface AxiosRequestConfig<T> {
    baseURL?: string;
    method?: string;
    url: string;
    data?: T;
    headers?: Headers | Record<string, string>;
    timeout?: number;
    withCredentials?: boolean;
}

export interface AxiosResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers | Record<string, string> | string;
    config: AxiosRequestConfig<T>;
}

interface AxiosError<T = never> extends Error {
    config: AxiosRequestConfig<T>;
    code?: string;
    request?: XMLHttpRequest;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
}

function createError<T>(
    message: string,
    config: AxiosRequestConfig<T>,
    code?: string,
    request?: XMLHttpRequest,
    response?: AxiosResponse<T>,
): AxiosError<T> {
    const error: AxiosError<T> = new Error(message) as AxiosError<T>;
    error.config = config;
    error.code = code;
    error.request = request;
    error.response = response;
    error.isAxiosError = true;

    if (response) {
        error.message = `Request failed with status ${response.status}`;
    } else if (request) {
        error.message = 'Request failed';
    } else {
        error.message = 'Error occurred during request';
    }

    return error;
}

class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T>> = [];

    use(
        onFulfilled?: InterceptorFulfilled<T>,
        onRejected?: InterceptorRejected<T>,
    ): number {
        this.interceptors.push({
            onFulfilled: onFulfilled,
            onRejected: onRejected,
        });
        return this.interceptors.length - 1;
    }

    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors.splice(id, 1);
        }
    }

    forEach(fn: (interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach((interceptor) => {
            fn(interceptor);
        });
    }
}

type InterceptorFulfilled<T> = (value: T) => T | Promise<T>;
type InterceptorRejected<T> = (error: AxiosError<T>) => unknown;

interface Interceptor<T> {
    onFulfilled?: (value: T) => T | Promise<T>;
    onRejected?: (error: AxiosError<T>) => unknown;
}

export class Axios<T = unknown> {
    defaultConfig: AxiosRequestConfig<T> = {
        method: 'GET',
        url: '',
        headers: {},
        timeout: 0,
        withCredentials: true,
    };

    interceptors = {
        request: new InterceptorManager<AxiosRequestConfig<T>>(),
        response: new InterceptorManager<AxiosResponse<T>>(),
    };

    constructor(config: AxiosRequestConfig<T> = { url: '' }) {
        this.defaultConfig = { ...this.defaultConfig, ...config };
    }

    request<U = T>(config: AxiosRequestConfig<U>): Promise<AxiosResponse<U>> {
        const mergedConfig: AxiosRequestConfig<U> = {
            ...this.defaultConfig,
            ...config,
        } as AxiosRequestConfig<U>;

        if (mergedConfig.baseURL && !mergedConfig.url.startsWith('http')) {
            mergedConfig.url = mergedConfig.baseURL + mergedConfig.url;
        }

        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.withCredentials = config.withCredentials ?? true;
            request.open(config.method || 'GET', mergedConfig.url);

            if (mergedConfig.headers) {
                Object.keys(mergedConfig.headers).forEach((key) => {
                    if (mergedConfig.headers instanceof Headers) {
                        request.setRequestHeader(
                            key,
                            (mergedConfig.headers as Headers).get(key) ?? '',
                        );
                    } else {
                        request.setRequestHeader(
                            key,
                            mergedConfig.headers?.[key] ?? '',
                        );
                    }
                });
            }

            request.timeout = mergedConfig.timeout || 0;

            request.onload = function () {
                const response: AxiosResponse<U> = {
                    data: request.responseText as U,
                    status: request.status,
                    statusText: request.statusText,
                    headers: request.getAllResponseHeaders(),
                    config: mergedConfig,
                };

                if (request.status >= 200 && request.status < 300) {
                    resolve(response);
                } else {
                    reject(
                        createError(
                            request.statusText,
                            mergedConfig,
                            undefined,
                            request,
                            response,
                        ),
                    );
                }
            };

            request.onerror = function () {
                reject(
                    createError(
                        'Network error',
                        mergedConfig,
                        undefined,
                        request,
                    ),
                );
            };

            request.ontimeout = function () {
                reject(
                    createError(
                        'Request timeout',
                        mergedConfig,
                        'ECONNABORTED',
                        request,
                    ),
                );
            };

            request.send(
                JSON.stringify(mergedConfig.data) as
                    | Document
                    | XMLHttpRequestBodyInit,
            );
        });
    }

    get<T = never>(
        url: string,
        config?: AxiosRequestConfig<T>,
    ): Promise<AxiosResponse<T>> {
        return this.request<T>({
            ...config,
            method: 'GET',
            url: (config?.url ?? '') + url,
        });
    }

    delete<T = never>(
        url: string,
        config?: AxiosRequestConfig<T>,
    ): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }

    patch<T = never>(
        url: string,
        data?: never,
        config?: AxiosRequestConfig<T>,
    ): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'PATCH', url, data });
    }

    post<T>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig<T>,
    ): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    create(config?: AxiosRequestConfig<T>): Axios<T> {
        const instanceConfig = {
            ...this.defaultConfig,
            ...config,
        } as AxiosRequestConfig<T>;

        const instance = new Axios<T>(instanceConfig);
        instance.interceptors.request = this.interceptors
            .request as InterceptorManager<AxiosRequestConfig<T>>;
        instance.interceptors.response = this.interceptors
            .response as InterceptorManager<AxiosResponse<T>>;
        return instance;
    }
}
