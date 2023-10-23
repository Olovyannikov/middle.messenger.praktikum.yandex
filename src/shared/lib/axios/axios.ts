type HTTPMethod = <T>(
    url: string,
    headers?: Record<string, string>,
    data?: FormData | object | null,
) => Promise<AxiosResponse<T>>;

export interface AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

interface AxiosRequestConfig {
    baseURL?: string;
    withCredentials?: boolean;
    headers?: Record<string, string>;
}

class Axios {
    private axiosInstance: XMLHttpRequest;
    private config: AxiosRequestConfig;

    constructor(config: AxiosRequestConfig = {}) {
        this.axiosInstance = new XMLHttpRequest();
        this.config = config;
    }

    private handleResponse<T>(response: XMLHttpRequest): AxiosResponse<T> {
        try {
            return {
                data: JSON.parse(response.responseText) as T,
                status: response.status,
                statusText: response.statusText,
            };
        } catch {
            return {
                data: response.responseText as T,
                status: response.status,
                statusText: response.statusText,
            };
        }
    }

    private sendRequest<T>(
        method: string,
        url: string,
        data?: FormData | object | null,
        headers?: Record<string, string>,
    ): Promise<AxiosResponse<T>> {
        return new Promise((resolve, reject) => {
            this.axiosInstance.open(
                method,
                `${this.config.baseURL || ''}${url}`,
                true,
            );

            if (this.config.withCredentials) {
                this.axiosInstance.withCredentials = true;
            }

            for (const [key, value] of Object.entries({
                ...this.config.headers,
                ...headers,
            })) {
                this.axiosInstance.setRequestHeader(key, value);
            }

            this.axiosInstance.onload = () => {
                if (
                    this.axiosInstance.status >= 200 &&
                    this.axiosInstance.status < 300
                ) {
                    resolve(this.handleResponse<T>(this.axiosInstance));
                } else {
                    reject(JSON.parse(this.axiosInstance.response));
                }
            };

            this.axiosInstance.onerror = () => {
                reject(new Error('Request error'));
            };

            if (data instanceof FormData) {
                this.axiosInstance.send(data);
            } else if (data !== null) {
                this.axiosInstance.send(JSON.stringify(data));
            } else {
                this.axiosInstance.send();
            }
        });
    }

    get: HTTPMethod = (url, headers = {}) =>
        this.sendRequest('GET', url, null, headers);

    post: HTTPMethod = (url, headers, data) =>
        this.sendRequest('POST', url, data, headers);

    put: HTTPMethod = (url, headers, data) =>
        this.sendRequest('PUT', url, data, headers);

    delete: HTTPMethod = (url, headers, data) =>
        this.sendRequest('DELETE', url, data, headers);
}

export { Axios };