"use client"

import INPUT from "@/elements/INPUT";
import LogoCP from "@/elements/LogoCP";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { registerData_interface, registerDataError_interface } from "@/types/StatesTypes";
import { RegisterFormsValidation } from "@/utils/forms";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/module/Loader";


const RegisterPage = () => {
    // State for loading indicator
    const [loading, setLoading] = useState<boolean>(false);

    // State for user input data
    const [DATA, setData] = useState<registerData_interface>({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // State for validation errors
    const [DATA_Error, setDataError] = useState<registerDataError_interface>({
        name_error: "",
        last_name_error: "",
        email_error: "",
        password_error: "",
        confirmPassword_error: "",
    });

    // Destructuring user input data
    const { name, last_name, email, password, confirmPassword } = DATA;

    // Destructuring validation errors
    const { name_error, last_name_error, email_error, password_error, confirmPassword_error } = DATA_Error;

    const router = useRouter();

    // Function to handle input changes
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    
    // Validate the forms inputs
    useEffect(() => {
        setDataError(RegisterFormsValidation(DATA, DATA_Error));
    } , [DATA]);

    // Function to handle user registration
    const handleSignUp = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        // Register the user using NextAuth credentials
        const res = await signIn("credentials", {
            email,
            password,
            name,
            last_name,
            redirect: false
        });

        setLoading(false);

        // Handle login response
        if (res?.error) {
            toast.error(res.error);
        } else {
            router.push("/");
        }
    };

    return (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="container text-Greyscale-900 py-8 lg:ml-6">
                <LogoCP color="black" fontsize="text-3xl" img_Width="w-9" />
                <div className="mb-8">
                    <h2 className="text-Heading-4 mt-6 mb-4">Create your Account Now</h2>
                    <p className="text-Body-RL-Medium text-gray-700">
                        Your dream home is just a click away. Create your free account and start your journey to finding the perfect property.
                    </p>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-y-4">
                    <INPUT 
                        label="Name"
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Enter your name here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={name_error || ""}
                    />
                    <INPUT 
                        label="Last Name"
                        type="text"
                        name="last_name"
                        value={last_name}
                        placeholder="Enter your last name here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={last_name_error || ""}
                    />
                    <INPUT 
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={email_error || ""}
                    />
                    <INPUT 
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={password_error || ""}
                    />
                    <INPUT 
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm your password here"
                        changeHandler={changeHandler}
                        textarea={false}
                        error={confirmPassword_error || ""}
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-12 mb-8 flex flex-col items-center justify-center gap-y-4">
                    {loading ? (
                        <Loader />
                    ) : (
                        <button onClick={handleSignUp} className="text-primary-0 bg-primary-50 rounded-full py-3 text-Body-MD-Small w-full hover:bg-primary-100">
                            Register Now
                        </button>
                    )}
                    <p className="text-Greyscale-700 text-Body-MD-Small">
                        Already have an account? <Link href="/login" className="text-Body-SM-Small">Login</Link>
                    </p>
                </div>

                {/* Alternative Login Option */}
                <div className="flex items-center relative justify-center">
                    <hr className="w-full" />
                    <span className="text-Body-MD-Small absolute bg-Neutral px-4">Or</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-2 my-6">
                    <button onClick={() => signIn("google")} className="text-Greyscale-900 flex items-center justify-center gap-x-3 hover:text-primary-0 border border-Greyscale-100 rounded-full py-3 text-Body-MD-Small w-full hover:bg-primary-50">
                        <FcGoogle className="text-xl" /> Sign Up with Google
                    </button>
                </div>

                {/* Terms and Conditions */}
                <p className="text-Greyscale-700 text-Body-MD-Small text-center">
                    By clicking continue, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>

            {/* Right-Side Banner */}
            <div className="items-end relative hidden md:flex">
                <img className="hidden md:block w-screen lg:h-full" src="/img/LoginBanner.png" alt="Login Banner" />
                <div className="absolute m-8">
                    <p className="text-Heading-4 text-Neutral">
                        “Having dealt with many real estate firms over the years, Dwellfinder stands out for their exceptional service and understanding of the luxury market. Their discretion, and attention”
                    </p>
                    <p className="text-Heading-5 mt-6 text-primary-50">
                        Robert Thompson <span className="text-Neutral">•</span> First-Time Homebuyers
                    </p>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default RegisterPage;