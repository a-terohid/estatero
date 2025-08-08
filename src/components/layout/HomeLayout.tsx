"use client";

import Footer from "@/module/Footer";
import Navbar from "@/module/Navbar";
import { UserRole } from "@/types/enums/generalEnums";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

/**
     * HomeLayout component wraps the page content with Navbar and Footer.
     * It conditionally hides Navbar and Footer on specific routes like login or password pages.
     * 
     * @param children - The main content to be rendered inside the layout.
     * @param role - The user role, used to customize the Navbar.
 */

const HomeLayout = ({ children, role }: { children: React.ReactNode; role: UserRole }) => {
    // Get current route pathname
    const pathname = usePathname();

    // Define routes where layout components (Navbar, Footer) should be hidden
    const hideLayout = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/set-password"
    ].includes(pathname);

    return (
        <body className="font-Manrope">
            {/* Conditionally render Navbar unless on excluded routes */}
            {!hideLayout && <Navbar role={role} />}
            
            {/* Render main page content */}
            <div className={``}>{children}</div>

            {/* Conditionally render Footer unless on excluded routes */}
            {!hideLayout && <Footer />}
            
            {/* Toast notifications container */}
            <Toaster />
        </body>
    );
};

export default HomeLayout;