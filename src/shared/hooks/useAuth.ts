import { useState } from '@/jsx/hooks/useState.ts';
import { useEffect } from '@/jsx/hooks/useEffect.ts';
import { AuthService } from '@/services/Auth/Auth.service.ts';
import { useUserStore } from '@/store/User';
import { isRMError } from '@/shared/types/type-guards/isRMError.ts';

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
            .catch((e: unknown) => {
                if (isRMError(e)) {
                    throw new Error(e?.reason ?? 'Произошла ошибка useAuth.ts');
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