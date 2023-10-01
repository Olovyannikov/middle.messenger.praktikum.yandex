import { AuthService } from '@/services/Auth/Auth.service.ts';
import { useState } from '@/jsx/hooks/useState.ts';
import { useEffect } from '@/jsx/hooks/useEffect.ts';
import { useUserStore } from '@/store/User';

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useUserStore();

    useEffect(() => {
        AuthService.getUser()
            .then((res) => {
                if (res.status !== 200 || !res.data) {
                    setIsAuth(false);
                } else {
                    setIsAuth(true);
                    setUser.set(res.data);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return {
        isLoading,
        isAuth,
        user,
    };
};