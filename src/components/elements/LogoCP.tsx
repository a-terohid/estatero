import Link from 'next/link';
import React from 'react';

const LogoCP = () => {
    return (
        <Link href='/' className='flex items-center gap-x-2 font-bold md:text-3xl text-Neutral' >
            <img className='w-6 md:w-fit' src="/img/Logo.png" alt='logo' />
            <p>ESTATERO</p>
        </Link >
    );
};

export default LogoCP;