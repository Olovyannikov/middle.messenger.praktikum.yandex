declare module '*.svg' {
    export const Component: JSX.FunctionComponent<
        JSX.SVGProps<SVGSVGElement> & { title?: string }
    >;
}
