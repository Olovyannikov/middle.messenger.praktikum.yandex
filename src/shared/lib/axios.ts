interface AxiosRequestConfig {
    method?: string;
    url: string;
    data?: never;
    headers?: never;
    timeout?: number;
}

interface AxiosResponse<T = never> {
    data: T;
    status: number;
    statusText: string;
    headers: string;
    config: AxiosRequestConfig;
}

interface AxiosError<T = never> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: XMLHttpRequest;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
}

function createError<T>(
    message: string,
    config: AxiosRequestConfig,
    code?: string,
    request?: XMLHttpRequest,
    response?: AxiosResponse<T>,
): AxiosError<T> {
    const error = new Error(message) as AxiosError<T>;
    error.config = config;
    error.code = code;
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    return error;
}

class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T>> = [];

    use(
        onFulfilled?: (value: T) => T | Promise<T>,
        onRejected?: (error: never) => never,
    ): number {
        this.interceptors.push({
            onFulfilled,
            onRejected,
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

interface Interceptor<T> {
    onFulfilled?: (value: T) => T | Promise<T>;
    onRejected?: (error: never) => never;
}

export class Axios {
    interceptors = {
        request: new InterceptorManager<AxiosRequestConfig>(),
        response: new InterceptorManager<AxiosResponse>(),
    };

    request<T = never>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(config.method || 'GET', config.url);

            if (config.headers) {
                Object.keys(config.headers).forEach((key) => {
                    config.headers &&
                        request.setRequestHeader(key, config.headers[key]);
                });
            }

            request.timeout = config.timeout || 0;

            request.onload = function () {
                const response: AxiosResponse<T> = {
                    data: request.responseText as T,
                    status: request.status,
                    statusText: request.statusText,
                    headers: request.getAllResponseHeaders(),
                    config: config,
                };

                if (request.status >= 200 && request.status < 300) {
                    resolve(response);
                } else {
                    reject(
                        createError(
                            request.statusText,
                            config,
                            undefined,
                            request,
                            response,
                        ),
                    );
                }
            };

            request.onerror = function () {
                reject(
                    createError('Network error', config, undefined, request),
                );
            };

            request.ontimeout = function () {
                reject(
                    createError(
                        'Request timeout',
                        config,
                        'ECONNABORTED',
                        request,
                    ),
                );
            };

            request.send(config.data);
        });
    }

    get<T = never>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    delete<T = never>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }

    patch<T = never>(
        url: string,
        data?: never,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'PATCH', url, data });
    }

    post<T = never>(
        url: string,
        data?: never,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    create(config?: AxiosRequestConfig): Axios {
        const instance = new Axios();
        if (config) {
            instance.interceptors.request = this.interceptors.request;
            instance.interceptors.response = this.interceptors.response;
        }
        return instance;
    }
}