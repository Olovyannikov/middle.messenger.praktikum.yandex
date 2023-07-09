import { VDom } from '@/jsx';

interface RootLayoutProps {
    children?: JSX.Element;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <div className="app">
            <main>{children}</main>
        </div>
    );
};
