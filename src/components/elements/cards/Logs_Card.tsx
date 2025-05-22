import User from '@/models/user';
import { LOG_Interface } from '@/types/modelTypes';
import connectDB from '@/utils/connectDB';
import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';

const Logs_Card = async ({log}: {log: LOG_Interface}) => {

    const { title , action , user_id , createdAt } = log

    const emailRegex = /([\w.-]+@[\w.-]+\.\w+)/;
    const parts = title.split(emailRegex);

    await connectDB()

    let user 
    
    user_id != "0" ? user= await User.findOne({_id: user_id}) : null

    return (
        <div className=' px-3 py-2 bg-primary-0 rounded-xl text-[10px] md:text-Body-RL-XSmall lg:text-Body-RL-Small'>
            <details className="group">
                {/* Summary section, clickable to toggle the dropdown */}
                <summary className="flex items-center justify-between cursor-pointer">
                    {/* Link to the main menu item */}
                    <p>
                        {parts.map((part, index) =>
                            emailRegex.test(part) ? (
                            <span key={index} className="font-bold underline">{part}</span>
                            ) : (
                            <span key={index}>{part}</span>
                            )
                        )}
                    </p>                    
                    {/* Dropdown icon that rotates when the menu is open */}
                    <span className="text-2xl lg:text-3xl ml-3 transition-transform duration-500 group-open:rotate-45">
                        <MdArrowDropDown />
                    </span>
                </summary>
                {/* Submenu items, rendered if there are any children */}
                <div className='scale-up-ver-top mt-3 flex flex-col gap-y-1'>
                        <p className='font-bold'>Action: <span className='font-normal'>{action}</span></p>
                        { user ? <p className='font-bold'>Action by: <span className='font-normal'>{user.email}</span> </p> : null}
                        <p className='font-bold'>Areated at: <span className='font-normal'>{createdAt.toLocaleDateString()}</span></p>
                </div>
            </details>
        </div>
    );
};

export default Logs_Card;