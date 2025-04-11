"use client"

import OTPInput from '@/elements/OtpInput';
import Loader from '@/elements/Loader';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SetPasswordFormsValidation } from '@/utils/forms';
import { setPassword_interface, setPasswordError_interface } from '@/types/StatesTypes';
import INPUT from '@/elements/INPUT';
import { resetDate_interface } from '@/types/pagesProps';
import { useRouter } from 'next/navigation';
import { ERROR } from '@/types/enums/MessageUnum';
import { verifyPassword } from '@/utils/auth';

// Main component for the set password page
const SetPasswordDahsboardPage = ({ userEmail, token, expire }: resetDate_interface) => {

    // Component state
    const [otp, setOtp] = useState<string>('');
    const [loadingCode, setLoadingCode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<setPassword_interface>({
        password: "",
        confirmPassword: "",
    });
    const [data_error, setDataError] = useState<setPasswordError_interface>({
        password_error: "",
        confirmPassword_error: "",
    });

    // Destructuring values
    const { password , confirmPassword } = data
    const { password_error , confirmPassword_error } = data_error

    const hasMounted = useRef(false); // To avoid running useEffect on first render
    const router = useRouter(); // Router instance

    // Handle password inputs
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setDataError(SetPasswordFormsValidation(data, data_error)); // Validate input on change
    };

    // Validate data on input change after initial mount
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return
        }
        setDataError(SetPasswordFormsValidation(data, data_error));
    }, [data]);

    // Save OTP when input is completed
    const handleSubmit = (pin: string) => setOtp(pin);

    // Request a new verification code
    const handleGetCode = async (event: any) => {
        event.preventDefault();
        setLoadingCode(true);

        const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email : userEmail }),
            headers: { "Content-Type": "application/json" },
        });

        const resData = await res.json();
        console.log(resData); // Debugging

        setLoadingCode(false);

        if (resData?.error) {
            toast.error(resData?.error);
        } else {
            toast.success(resData?.message);
        }
    };

    // Final step to verify OTP and set new password
    const handleSetPasswords = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        // Validate OTP
        if (!otp || otp.length < 6) {
            toast.error(ERROR.OTP_REQUIRED);
            setLoading(false);
            return;
        }

        // Verify OTP token
        const isValid = await verifyPassword(otp, token);

        if (!isValid) {
            toast.error(ERROR.INVALID_TOKEN);
            setLoading(false);
            return;
        }

        // Check token expiration
        const currentTime = new Date().getTime();
        const isExpired = currentTime > new Date(expire).getTime();

        if (isExpired) {
            toast.error(ERROR.RESET_LINK_EXPIRED);
            setLoading(false);
            return;
        }

        

        // Submit new password to API
        const res = await fetch("/api/auth/set-password", {
            method: "POST",
            body: JSON.stringify({  email : userEmail  , password }),
            headers: { "Content-Type": "application/json" },
        });

        const resData = await res.json();
        console.log(resData); // Debugging

        setLoading(false);

        // Redirect or show error
        if (resData?.error) {
            toast.error(resData?.error);
        } else {
            router.push(`/dashboard/profile`);
        }
    };

    return (
        <div className='px-5 py-5 md:px-7'>
            <h1 className='text-Heading-4 mb-6'>Set Password:</h1>
            <div className='flex flex-col gap-y-6'>
                <p className='text-Body-SM-Medium'>
                    User email: <span className='text-Body-MD-Medium ml-1'>{userEmail}</span>
                </p>

                {/* OTP Section */}
                <div>
                    <div className='flex items-center -mb-4'>
                        <p className='text-Body-SM-Medium'>Enter code:</p>
                        { loadingCode ? (
                            <p><Loader w={10} /></p>
                        ) : (
                            <p
                                onClick={handleGetCode}
                                className='text-Body-RL-XSmall italic text-Greyscale-400 hover:text-Greyscale-800 hover:cursor-pointer ml-1'
                            >
                                Don’t have the code? Click here
                            </p>
                        )}
                    </div>
                    <div className='md:ml-6 ml-4'>
                        <OTPInput onComplete={handleSubmit} />
                    </div>
                </div>

                {/* Password fields */}
                <div>
                    <p className='text-Body-SM-Medium'>New password:</p>
                    <div className='lg:w-1/2 mt-6 flex flex-col gap-y-4 md:ml-6 ml-4'>
                        <INPUT
                            label='Password'
                            value={password}
                            name='password'
                            placeholder='Enter your New Password Here'
                            type='password'
                            error={password_error || ""}
                            textarea={false}
                            changeHandler={changeHandler}
                        />
                        <INPUT
                            label='Confirm Password'
                            value={confirmPassword}
                            name='confirmPassword'
                            placeholder='Enter your New Password Here'
                            type='password'
                            error={confirmPassword_error || ""}
                            textarea={false}
                            changeHandler={changeHandler}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    {loading ? (
                        <Loader /> // Show loader
                    ) : (
                        <button
                            onClick={handleSetPasswords}
                            className="text-primary-0 bg-primary-100 rounded-xl py-3 text-Body-MD-Small w-full hover:bg-primary-50 mt-2"
                        >
                            Finish
                        </button>
                    )}
                </div>
            </div>

            <Toaster />
        </div>
    );
};

export default SetPasswordDahsboardPage;