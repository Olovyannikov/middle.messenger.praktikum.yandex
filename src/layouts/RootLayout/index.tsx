import { VDom } from '@/jsx';

interface RootLayoutProps {
    children?: JSX.Element;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
    return <main>{children}</main>;
};
