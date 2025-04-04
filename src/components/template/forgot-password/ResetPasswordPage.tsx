"use client"

import LogoCP from '@/elements/LogoCP';
import OTPInput from '@/elements/OtpInput';
import OtpInput from '@/elements/OtpInput';
import Loader from '@/module/Loader';
import { ERROR, MESSAGE } from '@/types/enums/MessageUnum';
import { resetpassword_props } from '@/types/pagesProps';
import { hashPassword, verifyPassword } from '@/utils/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const ResetPasswordPage = ({ email, token, expire, error }: resetpassword_props) => {
    
    // State for managing loading state
    const [loading, setLoading] = useState<boolean>(false);

    // State for storing the OTP input
    const [otp, setOtp] = useState<string>('');

    // Router for navigation
    const router = useRouter();

    // Function to handle OTP input completion
    const handleSubmit = (pin: string) => setOtp(pin);

    // Display error toast message if there's an error
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, []);

    // Function to handle password reset process
    const handleForgotPasswords = async (event: any) => {
        event.preventDefault();

        // Set loading state to true while processing
        setLoading(true);

        // Check if the reset link has expired
        const currentTime = new Date().getTime();
        const isExpired = currentTime > new Date(expire).getTime();

        if (isExpired) {
            toast.error(ERROR.RESET_LINK_EXPIRED);
            setLoading(false);
            return;
        }

        // Verify the entered OTP against the stored token
        const isValid = await verifyPassword(otp, token);

        if (!isValid) {
            toast.error(ERROR.INVALID_TOKEN);
            setLoading(false);
            return;
        } else {
            // If OTP is valid, display success message and navigate to set password page
            toast.success(MESSAGE.VALID_TOKEN);
            const hashedEmail = await hashPassword(email);
            setLoading(false);
            router.push(`/set-password?email=${email}&verify=${hashedEmail}`);
        }
    };

    return (
        <div className="bg-ForgotPassword-texture bg-cover bg-top">
            <div className="container h-screen flex items-center justify-center">
                <div className="bg-Neutral w-screen md:w-3/4 lg:w-1/2 rounded-xl py-8 md:py-12 px-4 md:px-12 flex flex-col items-center justify-center">
                    
                    {/* Logo Component */}
                    <LogoCP color="black" fontsize="text-2xl lg:text-3xl" img_Width="w-7" />

                    {/* Page Title and Description */}
                    <div className="flex flex-col items-center justify-center text-center lg:mx-8">
                        <h3 className="text-Heading-4 md:text-Heading-3 lg:text-Heading-2 text-Greyscale-900 mt-6 mb-4">
                            Password Reset
                        </h3>
                        <p className="text-Body-RL-Medium lg:text-Body-RL-Large text-Greyscale-700">
                            We sent your code to{' '}
                            <span className="text-Body-SM-Medium lg:text-Body-SM-Large text-Greyscale-700">{email}</span>
                        </p>
                    </div>

                    {/* OTP Input Field */}
                    <OTPInput onComplete={handleSubmit} />

                    {/* Submit Button & Loader */}
                    <div className="w-full mt-8 flex flex-col items-center justify-center gap-y-4">
                        {loading ? (
                            <Loader />
                        ) : (
                            <button
                                onClick={handleForgotPasswords}
                                className="text-primary-0 bg-primary-50 rounded-full py-3 text-Body-MD-Small w-full hover:bg-primary-100"
                            >
                                Continue
                            </button>
                        )}

                        {/* Link to Resend OTP */}
                        <p className="text-Greyscale-700 text-Body-MD-Small">
                            Didn’t get OTP Code?{' '}
                            <Link href="/forgot-password" className="text-Body-SM-Small">
                                Resend Code
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <Toaster />
        </div>
    );
};

export default ResetPasswordPage;