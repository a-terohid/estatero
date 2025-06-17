import { Agent_Interface, Property_Interface } from '@/types/modelTypes';
import React from 'react';
import ImageWithFallback from '../ImageWithFallback';
import Link from 'next/link';

const DashboardPropertyCard = ({property , agent}:{property: Property_Interface , agent:any}) => {

    const { thumbnail , description , title , _id , published , Location , price } = property
    const { unparsedAddress } = Location

    return (
        <div className={`p-3 ${published ? ' bg-Neutral' : " bg-Error-0"} rounded-xl`}>
            <div className='w-full flex flex-col lg:flex-row gap-x-6 gap-y-3 lg:items-end '>
                <div className='lg:w-1/4'>
                    <ImageWithFallback src={thumbnail || ""} alt={description} type='thumbnail' style='w-full !rounded-2xl border  border-primary-50' />
                </div>
                <ul className='flex flex-col gap-y-1 text-Body-RL-XSmall md:text-Body-RL-Small mb-3'>
                    <li><span className='text-Body-SM-XSmall md:text-Body-SM-Small'>Title:</span> <span>{title}</span></li>
                    <li><span className='text-Body-SM-XSmall md:text-Body-SM-Small'>Id:</span> <span>{_id}</span></li>
                    <li className='flex'><span className='text-Body-SM-XSmall md:text-Body-SM-Small '>Agents: </span> <span className='flex gap-x-2'>
                        {
                            agent.map( ( ag : Agent_Interface) => <span key={ag._id} >{ag.name} {ag.last_name}</span> )
                        }
                    </span></li>
                    <li><span className='text-Body-SM-XSmall md:text-Body-SM-Small'>UnparsedAddress:</span> <span>{unparsedAddress}</span></li>
                    <li><span className='text-Body-SM-XSmall md:text-Body-SM-Small'>Price:</span> <span>{price}$</span></li>
                    <li><span className='text-Body-SM-XSmall md:text-Body-SM-Small'>Published:</span> <span>{published ? "True" : "False"}</span></li>
                </ul>
                
            </div>
            <div className='flex justify-end mx-auto'>
                <Link className="bg-primary-100 text-white w-fit text-Body-RL-XSmall px-2 py-1 rounded-md cursor-pointer" href={`/dashboard/properties/${_id}`}>Review</Link>
            </div>
        </div>
    );
};

export default DashboardPropertyCard;