import { Axios } from '@/shared/lib/axios.ts';
import { BASE_URL } from '@/services/config.ts';

export const uploadFile = async (
    file: File,
    to = '/user/profile/avatar',
    filename = 'avatar',
) => {
    const request = new Axios({
        withCredentials: true,
        baseURL: BASE_URL,
    });

    const formData = new FormData();
    formData.append(filename, file);
    await request.put(to, formData);
};