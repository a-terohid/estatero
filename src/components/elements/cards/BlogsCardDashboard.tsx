import { Agent_Interface, Blog_Interface, User_Interface } from '@/types/modelTypes';
import React from 'react';
import ImageWithFallback from '../ImageWithFallback';
import Link from 'next/link';

const BlogsCardDashboard = ({ blog , author }: {blog: Blog_Interface , author: User_Interface | Agent_Interface}) => {

    const { published , thumbnails , description , title , _id , createdAt} = blog

    return (
         <div className={`p-3 ${published ? ' bg-Neutral' : " bg-Error-0"} rounded-xl`}>
            <div className='w-full flex flex-col lg:flex-row gap-x-6 gap-y-3 lg:items-end '>
                <div className='lg:w-1/4'>
                    <ImageWithFallback src={thumbnails || ""} alt={description} type='thumbnail' style='w-full !rounded-2xl border  border-primary-50' />
                </div>
                <ul className='flex flex-col gap-y-1 text-Body-RL-XSmall md:text-Body-RL-Small mb-3'>
                    <li><span className='text-Body-SM-XSmall md:text-Body-SM-Small'>Title:</span> <span>{title}</span></li>
                    <li className='flex'><span className='text-Body-SM-XSmall md:text-Body-SM-Small '>Author: </span> <span>{author.name} {author.last_name}</span> </li>
                    <li><span className='text-Body-SM-XSmall md:text-Body-SM-Small'>CreatedAt:</span> <span>{createdAt.toLocaleDateString()}</span></li>
                </ul>
                
            </div>
            <div className='flex justify-end mx-auto gap-x-2'>
                {/* {userIsAdmin && <PublishProprety id={_id} />} */}
                <Link className="bg-primary-100 hover:bg-primary-50 text-white w-fit text-Body-RL-XSmall px-2 py-1 rounded-md cursor-pointer" href={`/dashboard/blogs/${_id}`}>Review</Link>
                <Link className="bg-primary-100 hover:bg-primary-50 text-white w-fit text-Body-RL-XSmall px-2 py-1 rounded-md cursor-pointer" href={`/dashboard/blogs/edit/${_id}`}>Edit</Link>
            </div>
        </div>
    );
};

export default BlogsCardDashboard;