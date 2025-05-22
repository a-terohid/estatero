import { Agent_Interface } from '@/types/modelTypes';
import React from 'react';
import { BiPhoneCall } from "react-icons/bi";
import Link from 'next/link';
import { MdOutlineMail } from "react-icons/md";
import ImageWithFallback from '../ImageWithFallback';

/**
 * AgentsCard Component
 * 
 * This component renders a card that displays information about an agent, 
 * including their profile picture, name, job title, phone number, and email.
 * Each card is clickable and navigates to the agent's detailed page.
 * 
 * @param {Agent_Interface} agent - The agent object containing the agent's data.
 * @returns {JSX.Element} A card component displaying agent information.
 */
const AgentsCard = ({ agent }: { agent: Agent_Interface }) => {

    // Destructure agent properties for easier access
    const { _id, email, name, last_name, phone_number, profile_picture, short_title } = agent;

    return (
        <div className='p-2 border border-Greyscale-100 w-fit rounded-3xl'>
            {/* Link to the agent's detailed page */}
            <Link href={`agents/${_id}`} className='hover:blur-sm'>
                {/* Profile image with fallback handling */}
                <ImageWithFallback src={profile_picture || ""} alt={email} style={"rounded-b-2xl"} />
            </Link>

            <div className='p-2 flex items-center'>
                {/* Agent name and short title */}
                <div className='flex flex-col gap-y-1 flex-1'>
                    <Link href={`agents/${_id}`} className='text-Heading-6 md:text-Heading-5 hover:text-primary-100'>
                        {name} {last_name}
                    </Link>
                    <span className='text-Body-RL-Small md:text-Body-RL-Medium'>{short_title}</span>
                </div>

                {/* Contact links (phone and email) */}
                <div className='flex gap-x-2'>
                    {/* Phone link - opens in a new tab */}
                    <Link 
                        target='_blank' 
                        className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50' 
                        href={`tel:${phone_number}`}
                    >
                        <BiPhoneCall />
                    </Link>

                    {/* Email link - opens in a new tab */}
                    <Link 
                        target='_blank' 
                        className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50' 
                        href={`mailto:${email}`}
                    >
                        <MdOutlineMail />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AgentsCard;