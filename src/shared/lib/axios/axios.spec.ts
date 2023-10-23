import { Axios, AxiosResponse } from './axios';

import { JSDOM } from 'jsdom';

const dom = new JSDOM(
    '<!DOCTYPE html><html lang="ru"><body><div id="root"></div></body></html>',
    { url: 'http://localhost' },
);
Object.defineProperty(globalThis, 'XMLHttpRequest', {
    value: dom.window.XMLHttpRequest,
});

describe('Axios', () => {
    let axiosInstance: Axios;
    let mockAxios: jest.Mocked<Axios>;

    beforeEach(() => {
        axiosInstance = new Axios();
        mockAxios = axiosInstance as jest.Mocked<Axios>;
    });

    it('should send a GET request', async () => {
        // Arrange
        const url = 'https://api.example.com/users';
        const responseData = { id: 1, name: 'John Doe' };

        // Мокируем метод get
        mockAxios.get = jest.fn().mockResolvedValueOnce({
            data: responseData,
            status: 200,
            statusText: 'OK',
        });

        // Act
        const response: AxiosResponse<any> = await axiosInstance.get(url);

        // Assert
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK');
        expect(response.data).toEqual(responseData);
    });

    // Тесты для остальных методов (POST, PUT, DELETE) аналогичны

    it('should send a DELETE request', async () => {
        // Arrange
        const url = 'https://api.example.com/users/1';
        const responseData = { message: 'User deleted' };

        // Мокируем метод delete
        mockAxios.delete = jest.fn().mockResolvedValueOnce({
            data: responseData,
            status: 200,
            statusText: 'OK',
        });

        // Act
        const response: AxiosResponse<any> = await axiosInstance.delete(url);

        // Assert
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK');
        expect(response.data).toEqual(responseData);
    });

    it('should send a PUT request', async () => {
        // Arrange
        const url = 'https://api.example.com/users/1';
        const requestData = { name: 'John Doe' };
        const responseData = { message: 'User updated' };

        // Мокируем метод put
        mockAxios.put = jest.fn().mockResolvedValueOnce({
            data: responseData,
            status: 200,
            statusText: 'OK',
        });

        // Act
        const response: AxiosResponse<any> = await axiosInstance.put(
            url,
            requestData,
        );

        // Assert
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK');
        expect(response.data).toEqual(responseData);
    });

    it('should send a POST request', async () => {
        // Arrange
        const url = 'https://api.example.com/users';
        const requestData = { name: 'John Doe' };
        const responseData = { id: 1, name: 'John Doe' };

        // Мокируем метод post
        mockAxios.post = jest.fn().mockResolvedValueOnce({
            data: responseData,
            status: 201,
            statusText: 'Created',
        });

        // Act
        const response: AxiosResponse<unknown> = await axiosInstance.post(
            url,
            requestData,
        );

        // Assert
        expect(response.status).toBe(201);
        expect(response.statusText).toBe('Created');
        expect(response.data).toEqual(responseData);
    });
});