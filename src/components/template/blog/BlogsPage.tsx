import PaginationButtons from '@/elements/buttons/PaginationButtons';
import BlogCard from '@/elements/cards/BlogCard';
import { Blog_Interface } from '@/types/modelTypes';
import { DashboardBlogsPage_interface } from '@/types/pagesProps';
import React from 'react';

const BlogsPage = ({ blogs , authors , currentPage, totalPages , totalBlogs  }: DashboardBlogsPage_interface ) => {
    return (
        <div>
            {/* Background section with page title and description */}
            <div className="bg-Blogs-texture bg-cover bg-top lg:bg-center py-8">
                <div className="flex flex-col md:flex-row justify-between gap-y-4 mt-80 container">
                    {/* Page Title */}
                    <h3 className="text-Heading-4 md:text-Heading-2 text-Neutral">Blog</h3>
                    
                    {/* Page Description */}
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Greyscale-100">
                        Discover insights, tips, and trends in the real estate world through our blog. Whether you're buying, selling, or investing, find expert advice and market updates to guide your journey in making the best property decisions
                    </p>
                </div>
            </div>
            <div className='py-8 md:py-16 lg:py-28 container'>
                {
                    blogs.length ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'> {

                        blogs.map((bl:Blog_Interface) => {
                            const author = authors.find((user:any) => user._id.toString() === bl.autor_id.toString());
                            return <BlogCard key={bl._id} blog={bl} author={author} />;
                        } )
                        
                    }</div> : <p>no blogs found</p>
                }
                { blogs.length ?  <PaginationButtons currentPage={currentPage} totalPages={totalPages} /> : null }
            </div>
        </div>
    );
};

export default BlogsPage;