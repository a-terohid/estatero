"use client"

import { agentsSendMessageFromProps_interface } from '@/types/pagesProps';
import React, { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { mask } from '@/utils/mask';
import INPUT from './INPUT';
import Loader from './Loader';
import axios from 'axios';
import { ERROR } from '@/types/enums/MessageUnum';
import toast, { Toaster } from 'react-hot-toast';

/**
 * Component for sending a message to an agent in the dashboard.
 * 
 * Props:
 * - `full_name`: The agent's full name.
 * - `phone`: The agent's phone number.
 * - `imgSRC`: The agent's profile image source URL.
 * - `agent_id`: The agent's unique identifier.
 */
const AgentsSendmessageForm = ({ full_name, phone, imgSRC, agent_id }: agentsSendMessageFromProps_interface) => {

    // State to manage the message input value
    const [message, setMessage] = useState<string>("");

    // State to handle the loading status during form submission
    const [loading, setLoading] = useState(false);
    
    /**
     * Handler for the message input field
     * Updates the `message` state with the new input value
     * 
     * @param e - The input change event
     */
    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    /**
     * Handler for form submission
     * Sends the message to the server via a POST request
     * 
     * @param e - The form submit event
     */
    const SendHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Sending the request to the server
            const res = await fetch("/api/message", {
                method: "POST",
                body: JSON.stringify({
                    message: message.trim(),
                    receiver_id: `${agent_id}`,
                }),
                headers: { "Content-Type": "application/json" },
            });

            // Extract response data
            const resData = await res.json();
            setLoading(false);
            setMessage("");

            // Handle error or success response
            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
            }
        } catch (err: any) {
            setLoading(false);
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        }
    };

    return (
        <div className='p-3 md:p-4 border border-gray-200 rounded-xl mt-12'>
            {/* Agent information section */}
            <div className='py-2 px-3 rounded-xl flex gap-x-4 items-center bg-Greyscale-75'>
                <div className='w-14'>
                    <ImageWithFallback src={imgSRC || ""} alt={full_name} style={"rounded-b-2xl"} />
                </div>
                <div>
                    <h4 className='text-Heading-6 md:text-Heading-5'>{full_name}</h4>
                    {phone && (
                        <p className='text-Body-RL-Medium'>
                            {mask(phone, "(***) ***-****")}
                        </p>
                    )}
                </div>
            </div>

            {/* Message input section */}
            <div className='md:mt-8 mt-6 mb-8'>
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

            {/* Submit button or loading indicator */}
            {loading ? (
                <Loader />
            ) : (
                <button 
                    onClick={SendHandler} 
                    className='py-2 w-full md:w-fit px-4 rounded-full text-Body-MD-Small text-neutral-50 bg-primary-300 hover:bg-primary-100'
                >
                    Send Message
                </button>
            )}
        </div>
    );
};

export default AgentsSendmessageForm;