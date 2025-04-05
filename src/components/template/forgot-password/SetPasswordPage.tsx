 "use client"

import INPUT from "@/elements/INPUT";
import LogoCP from "@/elements/LogoCP";
import Loader from "@/module/Loader";
import { setPassword_interface, setPasswordError_interface } from "@/types/StatesTypes";
import { SetPasswordFormsValidation } from "@/utils/forms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SetPasswordPage = ({email}: {email : string}) => {
        
        const router = useRouter(); // Initialize the Next.js router

        const [loading, setLoading] = useState<boolean>(false);
        const [data, setData] = useState<setPassword_interface>({
            password: "",
            confirmPassword: "",
        });
        const [data_error, setDataError] = useState<setPasswordError_interface>({
            password_error: "",
            confirmPassword_error: "",
        });

        const { password , confirmPassword } = data
        const { password_error , confirmPassword_error } = data_error


    // Handle input changes
        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setData((prev) => ({ ...prev, [name]: value }));
            setDataError(SetPasswordFormsValidation(data, data_error));
        };

        // Validate the password input
        useEffect(()=> {
            setDataError(SetPasswordFormsValidation(data, data_error));
        }, [ data ])

        const handleSetPasswords = async (event: any) => {
            event.preventDefault(); // Prevent default form submission behavior
            setLoading(true); // Show loader
    
            // Send a request to the API to initiate the password reset process
            const res = await fetch("/api/auth/set-password", {
                method: "POST",
                body: JSON.stringify({ email , password }), // Send email to the backend
                headers: { "Content-Type": "application/json" }, // Set request headers
            });
    
            const resData = await res.json(); // Parse response data
            console.log(resData); // Log response for debugging
    
            setLoading(false); // Hide loader
    
            // Handle API response
            if (resData?.error) {
                toast.error(resData?.error); // Show error notification if there's an issue
            } else {
                router.push(`/login`); // Redirect user to reset password page
            }
        };

        return (
            <div className='bg-ForgotPassword-texture bg-cover bg-top'>
                {/* Main container that centers the form */}
                <div className='container h-screen flex items-center justify-center'>
                    <div className='bg-Neutral w-screen md:w-3/4 lg:w-1/2 rounded-xl py-8 md:py-12 px-4 md:px-12 flex flex-col items-center justify-center'>
                        
                        {/* Display the logo at the top */}
                        <LogoCP color="black" fontsize="text-2xl lg:text-3xl" img_Width="w-7" />
    
                        {/* Form heading and description */}
                        <div className='flex flex-col items-center justify-center text-center lg:mx-8'>
                            <h3 className='text-Heading-4 md:text-Heading-3 lg:text-Heading-2 text-Greyscale-900 mt-6 mb-4'>Set your New Password</h3>
                            <p className='text-Body-RL-Medium lg:text-Body-RL-Large text-Greyscale-700'>Secure your account with a fresh new password.</p>
                        </div>
    
                        <div className='w-full mt-6 flex flex-col gap-y-4'>
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
    
                        <div className='w-full mt-8 flex flex-col items-center justify-center gap-y-4'> 
                            {loading ? 
                                <Loader /> // Show loader while processing
                             : <button onClick={handleSetPasswords}  className="text-primary-0 bg-primary-50 rounded-full py-3 text-Body-MD-Small w-full hover:bg-primary-100">Finish</button>
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

export default SetPasswordPage;