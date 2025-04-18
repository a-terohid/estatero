"use client"

import INPUT from "@/elements/INPUT";
import LogoCP from "@/elements/LogoCP";
import Loader from "@/elements/Loader";
import { loginData_interface, loginDataError_interface } from "@/types/StatesTypes";
import { LoginFormsValidation } from "@/utils/forms";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    // State for loading status
    const [loading, setLoading] = useState<boolean>(false);
    
    // State to remember the email
    const [rememberMe, setRememberMe] = useState(false);
    
    // State for login form data
    const [DATA , setData] = useState<loginData_interface>({
        email : "",
        password: "",
    });

    // State for form validation errors
    const [DATA_Error , setDataError] = useState<loginDataError_interface>({
        email_error : "",
        password_error: "",
    });

    const { email , password } = DATA;
    const { email_error , password_error } = DATA_Error;

    const router = useRouter();
    const hasMounted = useRef(false); // To avoid running useEffect on first render

    // Retrieve saved email from localStorage if "Remember Me" was selected
    useEffect(() => {

        const savedEmail = localStorage.getItem("rememberedEmail");
        const isRemembered = localStorage.getItem("rememberMe") === "true";
    
        if (savedEmail) {
            setData((prev) => ({
                ...prev,
                email: savedEmail,
            }));
            setRememberMe(true);
        }
    }, []);

    // Validate data on input change after initial mount
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return
        }

        setDataError(LoginFormsValidation(DATA, DATA_Error));

    }, [DATA]);
    
    // Handle input changes
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    // Toggle "Remember Me" checkbox
    const handleRememberMe = (event: any) => {
        setRememberMe(event.target.checked);
    };

    // Handle login submission
    const handleSignUp = async (event: any)  => {
        event.preventDefault();
        setLoading(true);
               
        // Store only email in localStorage if "Remember Me" is checked
        if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberMe", "true");
        } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberMe");
        }

        // Authenticate user with NextAuth
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        setLoading(false);
        
        if (res?.error) {
            toast.error(res.error);
        } else {
            router.push("/");
        }
    };

    return (
        <div className="grid grid-cols-1 gap-x-12 gap-y-0 lg:grid-cols-2">
            <div className="container text-Greyscale-900 py-8 lg:ml-6">
                <LogoCP color="black" fontsize="text-3xl" img_Width="w-9" />
                <div className="mb-8">
                    <h2 className="text-Heading-4 mt-6 mb-4">Login to Your Real Estate Account</h2>
                    <p className="text-Body-RL-Medium text-gray-700">Find your dream home faster. Access saved properties, track favorites, and manage your home search journey.</p>
                </div>
                
                {/* Input fields for email and password */}
                <div className="flex flex-col gap-y-4">
                    <INPUT 
                        label= "Email"
                        type = "text"
                        name = "email"
                        value = {email}
                        placeholder ="Enter your email here"
                        changeHandler = {changeHandler}
                        textarea = {false}
                        error = {email_error || ""}
                    />
                    <INPUT 
                        label="Password"
                        type = "password"
                        name = "password"
                        value = {password}
                        placeholder ="Enter your password here"
                        changeHandler = {changeHandler}
                        textarea = {false}
                        error = {password_error || ""}
                    />
                </div>
                
                {/* Remember Me checkbox and Forgot Password link */}
                <div className="text-Body-RL-Small flex items-center justify-between mt-3">
                    <div className="flex items-center gap-x-2">
                        <input
                            className="w-4 h-4 appearance-none border rounded-md border-gray-300 checked:bg-primary-50 checked:border-primary-50 relative checked:after:content-['✔'] p-2 checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"                        type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMe}
                        />
                        <p>Remember Me</p>
                    </div>
                    <Link href='/forgot-password'>Forgot Password?</Link>
                </div>
                
                {/* Login button */}
                <div className="mt-12 mb-8 flex flex-col items-center justify-center gap-y-4">
                    { loading ? <Loader/> : <button onClick={handleSignUp} className="text-primary-0 bg-primary-50 rounded-full py-3 text-Body-MD-Small w-full hover:bg-primary-100">Login</button> }
                    <p className="text-Greyscale-700 text-Body-MD-Small">Don`t Have an Account? <Link href="/register" className="text-Body-SM-Small">Register Now</Link></p>
                </div>
                
                {/* Social Login Options */}
                <div className=" flex items-center relative justify-center">
                    <hr className="w-full"/>
                    <span className="text-Body-MD-Small absolute bg-Neutral px-4">Or</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-2 my-6">
                    <button onClick={() => signIn("google")} className="text-Greyscale-900 flex items-center justify-center gap-x-3 hover:text-primary-0 border border-Greyscale-100 rounded-full py-3 text-Body-MD-Small w-full hover:bg-primary-50"><FcGoogle className="text-xl"/> Sign Up with Google</button>
                </div>
                
                <p className="text-Greyscale-700 text-Body-MD-Small text-center">By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
            
            {/* Right side banner */}
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

export default LoginPage;