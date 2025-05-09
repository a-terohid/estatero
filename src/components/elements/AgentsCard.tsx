import { Agent_Interface } from '@/types/modelTypes';
import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import { BiPhoneCall } from "react-icons/bi";
import Link from 'next/link';
import { MdOutlineMail } from "react-icons/md";


const AgentsCard = ({agent}: {agent : Agent_Interface}) => {

    const { _id, 
        email, 
        name, 
        last_name, 
        phone_number, 
        profile_picture, 
        short_title
    } = agent;

    return (
        <div className='p-2 border border-Greyscale-100 w-fit rounded-3xl'>
            <Link href={`agents/${_id}`} className='hover:blur-sm' >
                <ImageWithFallback src={profile_picture || ""} alt={email} style={ "rounded-b-2xl"} />
            </Link>
            <div className='p-2 flex items-center' >
                <div className='flex flex-col gap-y-1 flex-1'>
                    <Link href={`agents/${_id}`} className='text-Heading-6 md:text-Heading-5 hover:text-primary-100'>{name} {last_name}</Link>
                    <span className='text-Body-RL-Small md:text-Body-RL-Medium'>{short_title}</span>
                </div>
                <div className='flex gap-x-2' >
                    <Link target='_blank' className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50' href={`tel:${phone_number}`}><BiPhoneCall/></Link>
                    <Link target='_blank' className='p-2 bg-primary-0 border rounded-lg text-xl hover:text-primary-50' href={`mailto:${email}`}><MdOutlineMail/></Link>
                </div>
            </div>
        </div>  
    );
};

export default AgentsCard;