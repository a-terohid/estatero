import { Agent_Interface, Blog_Interface, User_Interface } from '@/types/modelTypes';
import { replaceDescriptionImageSrc } from '@/utils/BlogDescriptionImageHandler';
import Image from 'next/image';
import React from 'react';

const BlogDetailspage = ({blog , author }:{blog:Blog_Interface , author : User_Interface | Agent_Interface | null }) => {

    const { title , createdAt , description, images , published , _id , thumbnails } = blog

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
                    quality={70}
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
            <div className='py-8 md:py-16 lg:py-28 container'>
                <div className="w-full">
                    <div
                        className="
                            prose 
                            prose-img:mx-auto 
                            prose-img:rounded-xl 
                            prose-img:w-2/3
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
            </div>
        </div>
    );
};

export default BlogDetailspage;