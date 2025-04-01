import { LogoCP_props } from '@/types/pagesProps';
import Link from 'next/link';
import React from 'react';


const LogoCP = ({color , img_Width , fontsize}: LogoCP_props) => {
    return (
        <Link href='/' className={`flex items-center gap-x-2 font-bold ${fontsize || 'md:text-3xl'} ${color === "black" ? "text-Greyscale-900": "text-Neutral"}`} >
            <img className={`${img_Width || 'w-6'} md:w-fit`} src="/img/Logo.png" alt='logo' />
            <p>ESTATERO</p>
        </Link >
    );
};

export default LogoCP;