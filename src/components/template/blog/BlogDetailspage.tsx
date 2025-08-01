import BlogTestimonialsForm from '@/elements/BlogTestimonialsForm';
import BlogCard from '@/elements/cards/BlogCard';
import ImageWithFallback from '@/elements/ImageWithFallback';
import { Agent_Interface, Blog_Interface, User_Interface } from '@/types/modelTypes';
import { replaceDescriptionImageSrc } from '@/utils/BlogDescriptionImageHandler';
import Image from 'next/image';
import React from 'react';

const BlogDetailspage = ({blog , author , otherBlogs }:{blog:Blog_Interface , author : User_Interface | Agent_Interface  , otherBlogs : any}) => {

    const { title , createdAt , description, images , published , _id , thumbnails } = blog

    const { name , last_name , email , profile_picture , phone_number } = author

    const finalDescription = replaceDescriptionImageSrc(description , images)

    return (
        <div>
            <div className="relative">
                {/* Hero Background Image */}
                <div className="absolute inset-0 -z-10">
                    <Image
                    src={thumbnails}
                    alt={description}
                    fill
                    priority
                    className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="pt-[400px] pb-20 container relative z-10">
                    <div className="flex flex-col">
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large text-Greyscale-100">
                        {createdAt.toLocaleDateString()}
                    </p>
                    <h3 className="text-Heading-6 md:text-Heading-5 lg:text-Heading-4 text-Neutral">
                        {title}
                    </h3>
                    </div>
                </div>
            </div>
            <div className='py-8 md:py-16 lg:py-28 container gap-y-5 grid grid-cols-1 lg:grid-cols-12'>
                <div className="lg:col-span-9 lg:mr-11">
                    <div
                        className="
                            prose 
                            prose-img:mx-auto 
                            prose-img:rounded-xl 
                            prose-p:text-justify
                            prose-ul:list-disc 
                            prose-ol:list-decimal 
                            prose-ul:pl-5 
                            prose-ol:pl-5 
                            prose-li:marker:text-black 
                            max-w-none
                        "
                        dangerouslySetInnerHTML={{ __html: finalDescription }}
                    />
                </div>
                <div className='lg:col-span-3'>
                    <div>
                        <h4 className='text-Heading-4 mb-3 lg:text-Heading-2'>Author</h4>
                        <div className='flex gap-x-4 items-center p-2 border border-Greyscale-100 w-full rounded-3xl'>
                            {/* Display sender profile picture with fallback */}
                            <ImageWithFallback src={profile_picture || ""} alt={email} style={"rounded-b-2xl w-20"} />
                            <div className=''>
                                {/* Show 'new' label for unread messages */}
                                <p className='md:text-Body-SM-Small lg:text-Body-SM-Medium'>{name} {last_name}</p> 
                                <p className='md:text-Body-RL-XSmall lg:text-Body-RL-Small'>{email}</p>
                            </div>     
                        </div>  
                    </div>  
                    <div className='mt-7'>
                        <h4 className='text-Heading-4 mb-3 lg:text-Heading-2'>Other Blogs</h4>
                         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4'> {

                            otherBlogs.map((bl:any) => {
                                return <BlogCard key={bl.blog._id} blog={bl.blog} author={bl.author} />;
                            } )
                            
                        }</div>
                    </div>  
                    <div className='mt-7'>
                        <h4 className='text-Heading-4 mb-3 lg:text-Heading-2'>Add Comment</h4>
                        <BlogTestimonialsForm blogid={_id || ''} />
                    </div>      
                </div>
            </div>
        </div>
    );
};

export default BlogDetailspage;