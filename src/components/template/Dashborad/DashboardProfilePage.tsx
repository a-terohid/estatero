import { UserRole } from '@/types/enums/generalEnums';
import { User_Interface } from '@/types/modelTypes';
import Link from 'next/link';
import { MdLockReset } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import React from 'react';
import ImageWithFallback from '@/elements/ImageWithFallback';
import LogoutButton from '@/elements/LogoutButton';

// DashboardProfilePage displays user's profile information such as email, name, role, etc.
// Also provides actions like edit profile, reset password, and logout.
const DashboardProfilePage = ({ user }: { user: User_Interface }) => {

    const { _id, email, name, last_name, phone_number, profile_picture, role, password, createdAt, updatedAt } = user;

    return (
        <div className='px-5 py-5 md:px-7' >
            
            {/* Show password warning if user registered with OAuth */}
            {
                !password || password === "oauth_no_password" ? (
                    <div>
                        <p className='px-4 py-3 bg-Error-50 text-Error-300 rounded-xl mb-5 text-Body-RL-Small'>
                            You didn`t set a password. Please  
                            <Link className='text-Body-SM-Small underline ml-1' href='/dashboard/profile/reset-password'>
                                click here
                            </Link> 
                            to set one.
                        </p>
                    </div>
                ) : null
            }

            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Profile:</h1>

            <div className='md:flex gap-x-6 lg:gap-x-8'>
                {/* Profile image with fallback */}
                <div className='w-2/3 md:w-1/3 relative'>
                    <ImageWithFallback src={profile_picture || ""} alt={email} style={role === UserRole.CLIENT ? "rounded-b-2xl" : ''} />
                    
                    {/* Show user role if not a CLIENT */}
                    {role !== UserRole.CLIENT ? (
                        <p className='pt-5 pb-1 px-2 rounded-b-xl text-center -mt-4 text-Body-RL-XSmall bg-Greyscale-700 text-Greyscale-200'>
                            {role}
                        </p>
                    ) : null}
                </div>

                {/* Profile info */}
                <div className='w-full'>
                    {/* Basic fields */}
                    <div className='mt-4 flex flex-col gap-y-2 pb-5 mb-5 border-b border-Greyscale-400'>
                        <p className='text-Body-SM-Medium'>
                            Email: 
                            {email ? (
                                <span className='text-Body-MD-Medium ml-1'>{email}</span>
                            ) : (
                                <span className='text-Body-RL-Small italic text-Greyscale-400 ml-1'>This field is empty</span>
                            )}
                        </p>
                        <p className='text-Body-SM-Medium'>
                            Name: 
                            {name ? (
                                <span className='text-Body-MD-Medium ml-1'>{name}</span>
                            ) : (
                                <span className='text-Body-RL-Small italic text-Greyscale-400 ml-1'>This field is empty</span>
                            )}
                        </p>
                        <p className='text-Body-SM-Medium'>
                            Last name: 
                            {last_name ? (
                                <span className='text-Body-MD-Medium ml-1'>{last_name}</span>
                            ) : (
                                <span className='text-Body-RL-Small italic text-Greyscale-400 ml-1'>This field is empty</span>
                            )}
                        </p>
                        <p className='text-Body-SM-Medium'>
                            Phone number: 
                            {phone_number ? (
                                <span className='text-Body-MD-Medium ml-1'>{phone_number}</span>
                            ) : (
                                <span className='text-Body-RL-Small italic text-Greyscale-400 ml-1'>This field is empty</span>
                            )}
                        </p>
                    </div>

                    {/* Dates */}
                    <div className='flex justify-between md:justify-start md:gap-x-5 pb-5 mb-5 border-b  border-Greyscale-400'>
                        <p className='text-Body-MD-XSmall md:text-Body-MD-Small'>
                            Register at: 
                            <span className='text-Body-RL-XSmall md:text-Body-RL-Small ml-1'>{createdAt.toLocaleDateString()}</span>
                        </p>
                        <p className='text-Body-MD-XSmall md:text-Body-MD-Small'>
                            Updated at: 
                            <span className='text-Body-RL-XSmall md:text-Body-RL-Small ml-1'>{updatedAt?.toLocaleDateString()}</span>
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div>
                        <ul className='text-Body-MD-XSmall md:text-Body-MD-Small flex gap-x-4 justify-center'>
                            <li>
                                <Link 
                                    href={`/dashboard/profile/edit?id=${_id}`} 
                                    className='flex items-center gap-x-1 bg-Secondary-200 text-Secondary-0 hover:bg-Secondary-50 hover:text-Secondary-300 p-2 rounded-lg'
                                >
                                    <FiEdit className='text-lg' />
                                    Edit
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={`/dashboard/profile/reset-password?id=${_id}`} 
                                    className='flex items-center gap-x-1 bg-Secondary-200 text-Secondary-0 hover:bg-Secondary-50 hover:text-Secondary-300 p-2 rounded-lg'
                                >
                                    <MdLockReset className='text-lg' />
                                    password
                                </Link>
                            </li>
                            <LogoutButton />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfilePage;