import BlogsCardDashboard from '@/elements/cards/BlogsCardDashboard';
import BlogsDahsboardFilterSection from '@/elements/filter/BlogsDahsboardFilterSection';
import { Agent_Interface, Blog_Interface, User_Interface } from '@/types/modelTypes';
import React from 'react';

const BlogsDashboardpage = ({ blogs , authors }: {blogs: Blog_Interface[] , authors: any}) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Blogs:</h1>
            <BlogsDahsboardFilterSection PATH='/dashboard/blogs' authors={authors} />
            <div>
                {
                    blogs.length ? <div className='flex flex-col gap-y-3'>{

                        blogs.map((bl:Blog_Interface) => {
                            const author = authors.find((user:any) => user._id.toString() === bl.autor_id.toString());
                            return <BlogsCardDashboard key={bl._id} blog={bl} author={author} />;
                        } )
                        
                    }</div> : <p>no blogs found</p>
                }
            </div>
            
        </div>
    );
};

export default BlogsDashboardpage;