"use client";

import Footer from "@/elements/Footer";
import Navbar from "@/elements/Navbar";
import { UserRole } from "@/types/enums/generalEnums";
import { usePathname } from "next/navigation";

const HomeLayout = ({ children , role  } : {children: React.ReactNode , role : UserRole}) => {
    const pathname = usePathname();
    const hideLayout = ["/login", "/register" , "/forgot-password" , "/reset-password", "/set-password"].includes(pathname); 

    return (
        <body className="font-Manrope">
            {!hideLayout && <Navbar role={role} />}
            <div className={``}>{children}</div>
            {!hideLayout && <Footer />}
        </body>
    );
};

export default HomeLayout;