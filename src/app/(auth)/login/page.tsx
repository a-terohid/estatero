"use client"

import { signIn } from "next-auth/react";

const page = () => {

    async function handleSignUp() {
        const res = await signIn("credentials", {
            email: "test@gmail.com",
            password : "test",
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
            log in
            <br/>
            <button onClick={handleSignUp}>llll</button>
        </div>
    );
};

export default page;