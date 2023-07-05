import {VDom} from "@/jsx";
import IndexPage from "@/pages";
import {RootLayout} from "@/layouts";
import Error404Page from "@/pages/Error404";

export const routerConfig: Record<string, JSX.Element> = {
    '/': <IndexPage/>,
    '/asd': <RootLayout>sdsad</RootLayout>,
    '/error-404': <Error404Page/>
}