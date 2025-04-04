"use client";

import Footer from "@/elements/Footer";
import Navbar from "@/elements/Navbar";
import { usePathname } from "next/navigation";

const HomeLayout = ({ children } : {children: React.ReactNode}) => {
    const pathname = usePathname();
    const hideLayout = ["/login", "/register" , "/forgot-password" , "/reset-password", "/set-password"].includes(pathname); 

    return (
        <body className="font-Manrope">
            {!hideLayout && <Navbar />}
            <div className={``}>{children}</div>
            {!hideLayout && <Footer />}
        </body>
    );
};

export default HomeLayout;