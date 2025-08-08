import Link from 'next/link';
import React from 'react';
import { BsFillHouseHeartFill } from 'react-icons/bs';
import { FaWpforms } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { LuBookCopy, LuMessagesSquare } from 'react-icons/lu';
import { MdHomeWork } from 'react-icons/md';
import { TbMessage } from 'react-icons/tb';

const DashboardPage = ({ RoleConditions , notifications}:any) => {

    const { isOwner , isAdmin , isAgent } = RoleConditions
    const { unPublishedProperties , unPublishedBlog , allMessages , myMessages , forms } = notifications

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Dashboard:</h1>
            <ul className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
                <li>
                    <Link href={"/dashboard/profile"} className='flex flex-col gap-y-1 text-Body-SM-Large items-center rounded-2xl p-5 text-Sky-50 justify-center bg-Sky-200 hover:bg-Sky-300'>
                        <p className='text-8xl'><IoMdPerson/></p>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link href={"/dashboard/liked_properties"} className='flex flex-col gap-y-1 text-Body-SM-Large items-center rounded-2xl p-5 text-Sky-50 justify-center bg-Sky-200 hover:bg-Sky-300'>
                        <p className='text-8xl'><BsFillHouseHeartFill/></p>
                        <span>Liked Properties</span>
                    </Link>
                </li> 
                {
                    isAdmin || isAgent || isOwner ? 
                    <li className=' relative'>
                        <Link href={"/dashboard/properties"} className='flex flex-col gap-y-1 text-Body-SM-Large items-center rounded-2xl p-5 text-Sky-50 justify-center bg-Sky-200 hover:bg-Sky-300'>
                            <p className='text-8xl'><MdHomeWork/></p>
                            <span>Properties</span>
                        </Link>
                        {(isOwner || isAdmin) && unPublishedProperties ? <span className='p-2 absolute top-3 right-4 bg-Error-50 text-Error-300 w-8 h-8 rounded-full flex items-center justify-center '>{unPublishedProperties}</span> : null}
                    </li> : null
                }
                {
                    isAdmin || isAgent || isOwner ? 
                    <li className=' relative'>
                        <Link href={"/dashboard/blogs"} className='flex flex-col gap-y-1 text-Body-SM-Large items-center rounded-2xl p-5 text-Sky-50 justify-center bg-Sky-200 hover:bg-Sky-300'>
                            <p className='text-8xl'><LuBookCopy/></p>
                            <span>Blogs</span>
                        </Link>
                        {(isOwner || isAdmin) && unPublishedBlog ? <span className='p-2 absolute top-3 right-4 bg-Error-50 text-Error-300 w-8 h-8 rounded-full flex items-center justify-center '>{unPublishedBlog}</span> : null}
                    </li> : null
                }
                {
                    isOwner ? 
                    <li className=' relative'>
                        <Link href={"/dashboard/all_messages"} className='flex flex-col gap-y-1 text-Body-SM-Large items-center rounded-2xl p-5 text-Sky-50 justify-center bg-Sky-200 hover:bg-Sky-300'>
                            <p className='text-8xl'><LuMessagesSquare/></p>
                            <span>All messages</span>
                        </Link>
                        {isOwner && allMessages ? <span className='p-2 absolute top-3 right-4 bg-Error-50 text-Error-300 w-8 h-8 rounded-full flex items-center justify-center '>{allMessages}</span> : null}
                    </li> : null
                }
                {
                    isAgent ? 
                    <li className=' relative'>
                        <Link href={"/dashboard/my_messages"} className='flex flex-col gap-y-1 text-Body-SM-Large items-center rounded-2xl p-5 text-Sky-50 justify-center bg-Sky-200 hover:bg-Sky-300'>
                            <p className='text-8xl'><TbMessage/></p>
                            <span>My messages</span>
                        </Link>
                         <span className='p-2 absolute top-3 right-4 bg-Error-50 text-Error-300 w-8 h-8 rounded-full flex items-center justify-center '>{myMessages}</span> 
                    </li> : null
                }
                {
                    isAdmin || isOwner ? 
                    <li className=' relative'>
                        <Link href={"/dashboard/forms"} className='flex flex-col gap-y-1 text-Body-SM-Large items-center rounded-2xl p-5 text-Sky-50 justify-center bg-Sky-200 hover:bg-Sky-300'>
                            <p className='text-8xl'><FaWpforms/></p>
                            <span>Forms</span>
                        </Link>
                        { forms ? <span className='p-2 absolute top-3 right-4 bg-Error-50 text-Error-300 w-8 h-8 rounded-full flex items-center justify-center '>{forms}</span> : null}
                    </li> : null
                }
            </ul>
        </div>
    );
};

export default DashboardPage;