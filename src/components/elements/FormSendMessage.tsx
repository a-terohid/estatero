"use client"; // Enables client-side rendering for this component in Next.js

import React, { useState } from 'react';
import Loader from './Loader';
import INPUT from './INPUT';
import toast from 'react-hot-toast';
import { ERROR } from '@/types/enums/MessageUnum';

const FormSendMessage = () => {

    // Form state to manage user input values
    const [data, setData] = useState({
        full_name : "",
        email : "",
        location: "",        
        subject : "", 
        message: "",  
    });

    const { full_name , email , location , subject , message } = data;

    // State to manage loading state during form submission
    const [loading, setLoading] = useState(false);
    
    // Handler for input changes
    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value.trim() });
    };

    // Handles form submission
    const SendHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send form data to API endpoint
            const res = await fetch("/api/form", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            // Parse the response
            const resData = await res.json();

            // Reset form and loading state
            setLoading(false);
            setData({
                full_name : "",
                email : "",
                location: "",        
                subject : "", 
                message: "",  
            });

            // Show toast notification based on server response
            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
            }
        } catch (err: any) {
            setLoading(false);
            // Fallback error message
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        }
    };

    return (
        <div className='p-3 md:p-4 border border-gray-200 rounded-xl lg:w-1/2 lg:ml-12 w-full'>
            <div className='w-full flex flex-col gap-y-4'>
                {/* Full name and Email inputs */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6'>
                    <INPUT
                        label="Full name"
                        type="text"
                        name="full_name"
                        value={full_name}
                        placeholder="Enter your full name here"
                        changeHandler={changeHandler}
                        textarea={false}
                        style=''
                    />
                    <INPUT
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email here"
                        changeHandler={changeHandler}
                        textarea={false}
                        style=''
                    />
                </div>

                {/* Location and optional subject inputs */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-1'>
                    <INPUT
                        label="Location"
                        type="text"
                        name="location"
                        value={location}
                        placeholder="Enter location here"
                        changeHandler={changeHandler}
                        textarea={false}
                    />
                    <INPUT
                        label="Subject (Optional)"
                        type="text"
                        name="subject"
                        value={subject}
                        placeholder="Enter subject here"
                        changeHandler={changeHandler}
                        textarea={false}
                    />
                </div>

                {/* Message input (textarea) */}
                <INPUT
                    label="Message"
                    type="text"
                    name="message"
                    value={message}
                    placeholder="Enter your message, and we will contact you shortly"
                    changeHandler={changeHandler}
                    textarea={true}
                />
            </div>

            {/* Submit button or loading spinner */}
            {loading ? (
                <Loader />
            ) : (
                <button 
                    onClick={SendHandler} 
                    className='py-2 w-full mt-8 md:w-fit px-4 rounded-full text-Body-MD-Small text-neutral-50 bg-primary-300 hover:bg-primary-100'
                >
                    Send Message
                </button>
            )}
        </div>
    );
};

export default FormSendMessage;