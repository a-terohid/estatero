import { Form_Interface } from '@/types/modelTypes';
import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import ReadForm from '../buttons/ReadForm';

const Formscard = async ({msg} : {msg : Form_Interface }) => {

    const { _id , full_name, email  , message , is_read  , location , subject} = msg;


    return (
        <div className={` px-3 py-2 ${ is_read ? "bg-primary-0" :" bg-Secondary-25"} rounded-xl text-[10px] md:text-Body-RL-XSmall lg:text-Body-RL-Small`}>
            <details className="group">
                <summary className="flex items-center justify-between cursor-pointer">
                        {/* Display sender profile picture with fallback */}
                        <div className=''>
                            {/* Show 'new' label for unread messages */}
                            { !is_read && <span className='px-2 bg-Error-50 text-Error-200 rounded-md text-Body-RL-XSmall '>new</span>}
                            <p className='md:text-Body-SM-XSmall lg:text-Body-SM-Small'>{subject}</p> 
                            <p className='md:text-Body-RL-XSmall lg:text-Body-RL-Small'>{full_name}</p>
                        </div>     
                    <span className="text-2xl lg:text-3xl ml-3 transition-transform duration-500 group-open:rotate-45">
                        <MdArrowDropDown />
                    </span>
                </summary>

                {/* Expandable content with message details and 'Mark as Read' action */}
                <div className='scale-up-ver-top mt-3 flex flex-col gap-y-1 ml-2'>
                    <p className='md:text-Body-RL-XSmall lg:text-Body-RL-Small'>{email}</p>
                    <p className='md:text-Body-RL-XSmall lg:text-Body-RL-Small mb-2'>{location}</p>
                    <p className=''>{message}</p>
                    {!is_read &&  <ReadForm _id={_id || ""} /> }
                </div>
            </details>
        </div>
    );
};

export default Formscard;