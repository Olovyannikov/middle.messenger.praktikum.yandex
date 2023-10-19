import { Axios } from '@/shared/lib/axios/axios.ts';
import { BASE_URL } from '@/services/config.ts';

export const uploadFile = async (
    file: File,
    to = '/user/profile/avatar',
    filename = 'avatar',
    data?: Record<string, string>,
) => {
    const request = new Axios({
        withCredentials: true,
        baseURL: BASE_URL,
    });

    const formData = new FormData();
    formData.append(filename, file);
    if (data) {
        Object.entries(data).forEach((el) => {
            formData.append(el[0], el[1]);
        });
    }

    await request.put(to, {}, formData);
};