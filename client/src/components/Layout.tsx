import type { FC, ReactNode } from "react";
import { ModeToggle } from "./ThemeToggler";
import { Toaster } from "./ui/toaster";

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>
            {children}
            <Toaster />
        </>
    );
};

export default Layout;
