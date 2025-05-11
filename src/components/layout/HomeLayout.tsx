"use client";

import Footer from "@/module/Footer";
import Navbar from "@/module/Navbar";
import { UserRole } from "@/types/enums/generalEnums";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const HomeLayout = ({ children , role  } : {children: React.ReactNode , role : UserRole}) => {
    const pathname = usePathname();
    const hideLayout = ["/login", "/register" , "/forgot-password" , "/reset-password", "/set-password"].includes(pathname);
    
    return (
        <body className="font-Manrope">
            {!hideLayout && <Navbar role={role}  />}
            <div className={``}>{children}</div>
            {!hideLayout && <Footer />}
            <Toaster />
        </body>
    );
};

export default HomeLayout;