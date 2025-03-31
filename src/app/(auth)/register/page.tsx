"use client"

import { signIn } from "next-auth/react";

const page = () => {

    async function handleSignUp() {
        const res = await signIn("credentials", {
            email: "test@gmail.com",
            password : "test",
            name: "ali", 
            redirect: false
        });
    
        if (res?.error) {
            console.log("Sign-up error:", res.error);
        } else {
            console.log("User signed up and logged in");
        }
    }

    return (
        <div>
            sign in
            <br/>
            <button onClick={handleSignUp}>ssss</button>
        </div>
    );
};

export default page;