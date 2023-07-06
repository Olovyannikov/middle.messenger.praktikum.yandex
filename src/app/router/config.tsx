import {VDom} from "@/jsx";
import IndexPage from "@/pages";
import {RootLayout} from "@/layouts";
import ErrorPage from "../../pages/Error";

export const routerConfig: Record<string, JSX.Element> = {
    '/': <IndexPage/>,
    '/asd': <RootLayout>sdsad</RootLayout>,
    '/not-found': <ErrorPage status={404} message='Кажется, что-то пошло не так, страница недоступна'/>,
    '/server-error': <ErrorPage status={500} message='Кажется, что-то пошло не так, страница недоступна'/>
}