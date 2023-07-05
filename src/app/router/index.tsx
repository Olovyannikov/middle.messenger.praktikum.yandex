import {useRouter} from "@/shared/hooks/useRouter.ts";
import {routerConfig} from "@/app/router/config.tsx";

export const Router = () => {
    const {pathname} = useRouter();

    if(!routerConfig[pathname]) {
        return routerConfig['/error-404']
    }

    return (
        routerConfig[pathname]
    )
}