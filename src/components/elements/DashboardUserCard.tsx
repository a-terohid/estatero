import { User_Interface } from '@/types/modelTypes';
import Link from 'next/link';
import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';

const DashboardUserCard = ({user , PATH} : {user:User_Interface , PATH:string}) => {

    const { _id, email , name , last_name , phone_number } = user

    return (
        <div className=' px-3 py-2 bg-primary-0 rounded-xl text-[10px] md:text-Body-RL-XSmall lg:text-Body-RL-Small'>
                    <details className="group">
                        {/* Summary section, clickable to toggle the dropdown */}
                        <summary className="flex items-center justify-between cursor-pointer">
                            <p className=' group-open:font-bold'>{email}</p>                    
                            {/* Dropdown icon that rotates when the menu is open */}
                            <span className="text-2xl lg:text-3xl ml-3 transition-transform duration-500 group-open:rotate-45">
                                <MdArrowDropDown />
                            </span>
                        </summary>
                        {/* Submenu items, rendered if there are any children */}
                        <div className='scale-up-ver-top mt-3 flex flex-col gap-y-1'>
                            { name && last_name ? <p className='font-bold'>Full name: <span className='font-normal'>{name} {last_name}</span></p> : <div>
                                {name ? <p className='font-bold'>Name: <span className='font-normal'>{name}</span></p> : null}
                                {last_name ? <p className='font-bold'> Last name: <span className='font-normal'>{last_name}</span></p> : null}
                            </div> }
                            {phone_number ?  <p className='font-bold'>Phone number: <span className='font-normal'>{phone_number}</span></p> : null }
                            <Link href={`${PATH}/${_id}`} className='px-2 py-1 mt-2 bg-primary-100 text-Body-RL-XSmall hover:bg-primary-50 rounded-md w-fit text-Neutral'>View</Link>
                        </div>
                    </details>
            
        </div>
    );
};

export default DashboardUserCard;