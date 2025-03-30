"use client";

import Footer from "@/elements/Footer";
import Navbar from "@/elements/Navbar";
import { usePathname } from "next/navigation";

const HomeLayout = ({ children } : {children: React.ReactNode}) => {
    const pathname = usePathname();
    const hideLayout = ["/login", "/register"].includes(pathname); 

    return (
        <body className="font-Manrope">
            {!hideLayout && <Navbar />}
            <div className={ ` bg-red-700 h-80`}>{children}</div>
            {/* <div className={ !hideLayout && `pt-[68px] lg:pt-24`}>{children}</div> */}
            {!hideLayout && <Footer />}
        </body>
    );
};

export default HomeLayout;