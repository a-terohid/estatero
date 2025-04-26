"use client"

// Import required components and utilities
import ImageWithFallback from '@/elements/ImageWithFallback';
import INPUT from '@/elements/INPUT';
import Loader from '@/elements/Loader';
import { UserRole } from '@/types/enums/generalEnums';
import { ERROR } from '@/types/enums/MessageUnum';
import { User_Interface } from '@/types/modelTypes';
import { mask } from '@/utils/mask';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TiArrowSortedDown } from 'react-icons/ti';

// User detail dashboard component
const UserDetailDashboard = ({ user, handlerRole, handlerId }: { user: User_Interface, handlerRole: UserRole, handlerId: string }) => {

    // Destructure user properties
    const { email, name, last_name, phone_number, profile_picture, role, createdAt, updatedAt } = user;

    // Component states
    const [changeRole, setChangeRole] = useState(role); // Selected role
    const [license_number, setLicenseNumber] = useState(""); // License number for agent roles
    const [loading, setLoading] = useState<boolean>(false); // Loading indicator

    const router = useRouter(); // Next.js router for navigation

    // Handle role change action
    const changeRoleHandler = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        // Prevent changing if the role is already Client
        if (changeRole === UserRole.CLIENT) {
            toast.error("User type already is Client");
            setLoading(false);
            return;
        }

        // Validate license number for Agent or AgentAdmin roles
        if (changeRole === UserRole.AGENT || changeRole === UserRole.AGENTADMIN) {
            if (!license_number) {
                toast.error(ERROR.REQUIRED_LINCENSE_NUMBER);
                setLoading(false);
                return;
            }
        }

        try {
            // Send PATCH request to update user role
            const response = await axios.patch('/api/auth/updateRole', {
                userID: handlerId,
                clinet_Email: email,
                newRole: changeRole,
                license_number : license_number.trim()
            });

            const resData = response.data;
            setLoading(false);

            // Handle server response
            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
                router.push("/dashboard/users"); // Redirect to user dashboard
            }
        } catch (err: any) {
            setLoading(false);
            toast.error(ERROR.PROBLEM); // Show generic error
        }
    }

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page Title */}
            <h1 className='text-Heading-4 mb-6'>User profile:</h1>

            <div className='md:flex gap-x-6 lg:gap-x-8'>
                {/* Profile image */}
                <div className='w-2/3 md:w-1/3 relative'>
                    <ImageWithFallback src={profile_picture || ""} alt={email} style={role === UserRole.CLIENT ? "rounded-b-2xl" : ''} />
                </div>

                {/* Profile information */}
                <div className='w-full'>
                    {/* Basic user fields */}
                    <div className='mt-4 flex flex-col gap-y-2 pb-5 mb-5 border-b border-Greyscale-400'>
                        {/* Email */}
                        <p className='text-Body-SM-Medium'>
                            Email:
                            {email ? (
                                <span className='text-Body-MD-Medium ml-1'>{email}</span>
                            ) : (
                                <span className='text-Body-RL-Small italic text-Greyscale-400 ml-1'>This field is empty</span>
                            )}
                        </p>
                        {/* Name */}
                        <p className='text-Body-SM-Medium'>
                            Name:
                            {name ? (
                                <span className='text-Body-MD-Medium ml-1'>{name}</span>
                            ) : (
                                <span className='text-Body-RL-Small italic text-Greyscale-400 ml-1'>This field is empty</span>
                            )}
                        </p>
                        {/* Last name */}
                        <p className='text-Body-SM-Medium'>
                            Last name:
                            {last_name ? (
                                <span className='text-Body-MD-Medium ml-1'>{last_name}</span>
                            ) : (
                                <span className='text-Body-RL-Small italic text-Greyscale-400 ml-1'>This field is empty</span>
                            )}
                        </p>
                        {/* Phone number */}
                        <p className='text-Body-SM-Medium'>
                            Phone number:
                            {phone_number ? (
                                <span className='text-Body-MD-Medium ml-1'>{mask(phone_number, "****-***-****")}</span>
                            ) : (
                                <span className='text-Body-RL-Small italic text-Greyscale-400 ml-1'>This field is empty</span>
                            )}
                        </p>
                    </div>

                    {/* Registration and update dates */}
                    <div className='flex justify-between md:justify-start md:gap-x-5 pb-5 mb-5 border-b border-Greyscale-400'>
                        <p className='text-Body-MD-XSmall md:text-Body-MD-Small'>
                            Register at:
                            <span className='text-Body-RL-XSmall md:text-Body-RL-Small ml-1'>{createdAt.toLocaleDateString()}</span>
                        </p>
                        <p className='text-Body-MD-XSmall md:text-Body-MD-Small'>
                            Updated at:
                            <span className='text-Body-RL-XSmall md:text-Body-RL-Small ml-1'>{updatedAt?.toLocaleDateString()}</span>
                        </p>
                    </div>

                    {/* Role change action */}
                    <div>
                        <h3 className='text-Body-SM-Large mb-4'>Action:</h3>
                        <div>
                            <div className='flex'>
                                {/* Role select dropdown */}
                                <p className='text-Body-SM-Medium'>Role:</p>
                                <div className='ml-5 flex flex-col gap-y-4'>
                                    <div className="relative inline-block w-full">
                                        <select
                                            name="sort"
                                            value={changeRole}
                                            onChange={(e: any) => setChangeRole(e.target.value)}
                                            className="appearance-none w-full lg:text-Body-RL-Small px-3 py-2 pr-8 border border-Greyscale-100 rounded-lg focus:text-Greyscale-900 focus:border-Greyscale-900 focus:outline-none text-Body-RL-XSmall"
                                        >
                                            <option value={UserRole.CLIENT}>Client</option>
                                            {(handlerRole === UserRole.OWNER || handlerRole === UserRole.AGENTOWNER) && (
                                                <option value={UserRole.ADMIN}>Admin</option>
                                            )}
                                            <option value={UserRole.AGENT}>Agent</option>
                                            <option value={UserRole.AGENTADMIN}>Agent/Admin</option>
                                        </select>
                                        {/* Dropdown icon */}
                                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-Greyscale-300">
                                            <TiArrowSortedDown />
                                        </div>
                                    </div>

                                    {/* License number input if needed */}
                                    {(changeRole === UserRole.AGENT || changeRole === UserRole.AGENTADMIN) && (
                                        <INPUT
                                            label=""
                                            type="text"
                                            name="license_number"
                                            value={license_number}
                                            placeholder="License number"
                                            changeHandler={(e: any) => setLicenseNumber(e.target.value)}
                                            textarea={false}
                                            error={""}
                                            style={"!px-3 !py-2 !text-Body-RL-XSmall lg:!text-Body-RL-Small"}
                                        />
                                    )}

                                    {/* Change button */}
                                    {changeRole !== UserRole.CLIENT && (
                                        loading ? (
                                            <Loader />
                                        ) : (
                                            <button
                                                onClick={changeRoleHandler}
                                                className='flex text-center justify-center items-center gap-x-1 text-Body-RL-XSmall lg:text-Body-RL-Small bg-Secondary-200 text-Secondary-0 hover:bg-Secondary-50 hover:text-Secondary-300 !px-3 !py-2 rounded-lg'
                                            >
                                                Change
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast notifications */}
            <Toaster />
        </div>
    );
};

export default UserDetailDashboard;