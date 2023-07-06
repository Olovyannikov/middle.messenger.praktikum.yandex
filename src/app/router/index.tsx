import {useRouter} from "@/shared/hooks/useRouter.ts";
import {routerConfig} from "@/app/router/config.tsx";

export const Router = () => {
    const {pathname} = useRouter();

    if(!routerConfig[pathname]) {
        return routerConfig['/not-found']
    }

    return (
        routerConfig[pathname]
    )
}