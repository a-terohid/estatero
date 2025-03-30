"use client";

import LogoCP from '@/elements/LogoCP';
import { usePathname } from 'next/navigation';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useState } from 'react';
import { navItems } from '@/constants/NavbarItems';
import { MdArrowDropDown } from "react-icons/md";
import Link from 'next/link';

const Navbar = () => {

     // State to manage the menu open/close state
     const [isOpen, setIsOpen] = useState(false);
     const pathname = usePathname(); // Get the current route path
     const [ PcPageMenue , setPcPageMenue] = useState(false)
 
     useEffect(() => {
         setIsOpen(false);
     }, [pathname]);
 
     // Toggle menu handler
     const handler = () => setIsOpen(!isOpen);

    return (
        <div className='bg-primary-200 z-30 fixed w-screen'>
            <div className=' container py-4 lg:py-8 flex justify-between items-center text-Greyscale-100'>
                <LogoCP />
                <div>
                    <ul className='items-center gap-x-4 text-Body-RL-Large hidden lg:flex'>
                        {
                            navItems.map(it =><li>
                                <Link onMouseEnter={it?.children ? () => setPcPageMenue(true) :undefined} className='p-1 flex items-center gap-x-1' href={it.href} key={it.href}>{it.name}{it?.children ? <MdArrowDropDown /> :null }</Link>
                                {
                                    PcPageMenue && it?.children ? <div onMouseLeave={ () => setPcPageMenue(false) } className='z-40 absolute bg-primary-200 px-4 py-5  rounded-b-lg'>
                                        <ul className='flex flex-col gap-y-3'>
                                            {
                                                it?.children.map( ch => <li className='hover:cursor-pointer' key={ch.href}><Link href={ch.href}>{ch.name}</Link></li>)
                                            }
                                        </ul>
                                    </div> :null
                                }
                            </li>)
                        }
                    </ul>
                </div>
                <div className='flex items-center gap-x-6'>
                    <div className='md:flex items-center gap-x-3 lg:text-Body-MD-Small text-Body-MD-XSmall hidden'>
                        <Link href="/register" className='lg:py-3 py-2 lh:px-8 px-5 hover:bg-Neutral rounded-full hover:text-Greyscale-900'>Register</Link>
                        <Link href="/login" className='bg-Neutral lg:py-3 py-2 lg:px-8 px-5 rounded-full text-Greyscale-900 hover:bg-primary-200 hover:text-Neutral'>Login</Link>
                    </div>
                    {/* Mobile Navigation Toggle Button */}
                    <div className="lg:hidden text-Neutral text-2xl">
                        <div className="w-6" onClick={handler}>
                            {!isOpen ? <RxHamburgerMenu /> : <RxCross2 />}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    isOpen ? <div className='grid grid-cols-[2fr,1fr] h-screen text-Greyscale-100'>
                        <div className='py-5 px-6'>
                            <ul className='text-Body-RL-Medium flex flex-col gap-y-3'>
                            {
                                navItems.map( it =><li>
                                    <Link  className='p-1 flex items-center gap-x-1' href={it.href} key={it.href}>{it.name}{it?.children ? <MdArrowDropDown /> :null }</Link>
                                    {
                                        it?.children ? <div className='ml-9 my-4'>
                                            <ul className='flex flex-col gap-y-3 list-disc text-Body-RL-Small'>
                                                {
                                                    it?.children.map(ch => <li className='hover:cursor-pointer' key={ch.href}><Link href={ch.href}>{ch.name}</Link></li>)
                                                }
                                            </ul>
                                        </div> :null
                                    }
                                </li>)
                            }
                            </ul>
                            <div className='md:hidden items-center pt-4 lg:text-Body-MD-Small text-Body-MD-XSmall flex mt-5 border-t justify-between border-t-primary-50'>
                                <Link href="/register" className='lg:py-3 py-2 lh:px-8 px-5 bg-Neutral rounded-full text-Greyscale-900'>Register</Link>
                                <Link href="/login" className='bg-Neutral lg:py-3 py-2 lg:px-8 px-5 rounded-full text-Greyscale-900'>Login</Link>
                            </div>
                        </div>
                        <div onClick={handler} className='bg-primary-300 opacity-10'></div>
                    </div> : null 
                }
            </div>
        </div>
    );
};

export default Navbar;