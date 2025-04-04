"use client"; // This directive ensures that the component runs on the client side.

import INPUT from '@/elements/INPUT'; // Input component for email input
import LogoCP from '@/elements/LogoCP'; // Logo component
import Loader from '@/module/Loader'; // Loader component for showing a loading indicator
import { forgotPasswordFormsValidation } from '@/utils/forms'; // Function to validate the form
import Link from 'next/link'; // For navigation between pages
import { useRouter } from 'next/navigation'; // Next.js router for page redirection
import React, { useState } from 'react'; // React hooks for state management
import toast, { Toaster } from 'react-hot-toast'; // Library for showing toast notifications

const ForgotPasswordPage = () => {
    
    // State variables for managing loading status, email input, and email validation error
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [email_error, setEmailError] = useState<string>("");

    const router = useRouter(); // Initialize the Next.js router

    // Function to handle input changes
    const changeHandler = (event: any) => {
        setEmail(event?.target?.value); // Update email state
        setEmailError(forgotPasswordFormsValidation({ email }, { email_error }).email_error); // Validate the email input
    };

    // Function to handle form submission when the user clicks "Send Reset Link"
    const handleForgotPasswords = async (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Show loader

        // Send a request to the API to initiate the password reset process
        const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email }), // Send email to the backend
            headers: { "Content-Type": "application/json" }, // Set request headers
        });

        const resData = await res.json(); // Parse response data
        console.log(resData); // Log response for debugging

        setLoading(false); // Hide loader

        // Handle API response
        if (resData?.error) {
            toast.error(resData?.error); // Show error notification if there's an issue
        } else {
            router.push(`/reset-password?email=${email}`); // Redirect user to reset password page
        }
    };

    return (
        <div className='bg-ForgotPassword-texture bg-cover bg-top'>
            {/* Main container that centers the form */}
            <div className='container h-screen flex items-center justify-center'>
                <div className='bg-Neutral w-screen md:w-3/4 lg:w-1/2 rounded-xl py-8 md:py-12 px-4 md:px-12 flex flex-col items-center justify-center'>
                    
                    {/* Display the logo at the top */}
                    <LogoCP color="black" fontsize="text-2xl" img_Width="w-7" />

                    {/* Form heading and description */}
                    <div className='flex flex-col items-center justify-center text-center lg:mx-8'>
                        <h3 className='text-Heading-4 md:text-Heading-3 lg:text-Heading-2 text-Greyscale-900 mt-6 mb-4'>Forgot Your Password?</h3>
                        <p className='text-Body-RL-Medium lg:text-Body-RL-Large text-Greyscale-700'>Don’t worry, it happens! Enter your email below, and we’ll send you a link to reset your password.</p>
                    </div>

                    {/* Email input field */}
                    <div className='w-full mt-6'>
                        <INPUT 
                            label='Email'
                            value={email}
                            name='email'
                            placeholder='Enter the email associated with your account'
                            type='email'
                            error={email_error || ""}
                            textarea={false}
                            changeHandler={changeHandler}
                        />
                    </div>

                    {/* Submit button and login link */}
                    <div className='w-full mt-8 flex flex-col items-center justify-center gap-y-4'> 
                        {loading ? 
                            <Loader /> // Show loader while processing
                         : <button onClick={handleForgotPasswords} className="text-primary-0 bg-primary-50 rounded-full py-3 text-Body-MD-Small w-full hover:bg-primary-100">Send Reset Link</button>
                        }
                        <p className="text-Greyscale-700 text-Body-MD-Small">Remember your Password? <Link href="/login" className="text-Body-SM-Small"> Login Here</Link></p>
                    </div>
                </div>
            </div>

            {/* Component for showing toast notifications */}
            <Toaster />
        </div>
    );
};

export default ForgotPasswordPage;