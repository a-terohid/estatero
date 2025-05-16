import Agent from '@/models/agent';
import User from '@/models/user';
import { Agent_Interface, Message_Interface, User_Interface } from '@/types/modelTypes';
import connectDB from '@/utils/connectDB';
import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import { MdArrowDropDown } from 'react-icons/md';

const findSender = async (senderId : string)  => {
    await connectDB()

    const sender = await User.findById(senderId) || Agent.findById(senderId);

    return sender

} 

const MessageCard = async ({msg} : {msg : Message_Interface}) => {

    const { _id , sender_id , message , is_read } = msg;

    const sender = await findSender(sender_id)

    const { name , last_name , email , profile_picture  } = sender


    return (
        <div className={` px-3 py-2 ${ is_read ? "bg-primary-0" :" bg-Secondary-25"} rounded-xl text-[10px] md:text-Body-RL-XSmall lg:text-Body-RL-Small`}>
                    <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer">
                            <div className='flex gap-x-4 items-center'>
                                <ImageWithFallback src={profile_picture || ""} alt={email} style={"rounded-b-2xl w-14"} />
                                <div className=''>
                                    { !is_read && <span className='px-2 bg-Error-50 text-Error-200 rounded-md text-Body-RL-XSmall '>new</span>}
                                    <p className='md:text-Body-SM-XSmall lg:text-Body-SM-Small'>{name} {last_name}</p> 
                                    <p className='md:text-Body-SM-XSmall lg:text-Body-SM-Small'>{email}</p>
                                </div>     
                            </div>                  
                            <span className="text-2xl lg:text-3xl ml-3 transition-transform duration-500 group-open:rotate-45">
                                <MdArrowDropDown />
                            </span>
                        </summary>
                        <div className='scale-up-ver-top mt-3 flex flex-col gap-y-1 ml-2'>
                                <p className=''>{message}</p>
                        </div>
                    </details>
                </div>
    );
};

export default MessageCard;