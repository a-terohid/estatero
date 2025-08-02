"use client"

import ShowRating from '../ShowRating';
import ImageWithFallback from '../ImageWithFallback';
import { useState } from 'react';
import INPUT from '../INPUT';
import Loader from '../Loader';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { ERROR } from '@/types/enums/MessageUnum';

const BlogTestimonialsCard = ({v , ts , userIsAdmin}:{v?:string , ts: any, userIsAdmin:boolean}) => {

    const [isOpen , setIsOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const [Reply , setReply] = useState<string>("")
    
    const { data } = useSession();

    const openHandler = () => setIsOpen(!isOpen)
    const changeHandler = (e: any) => {
        setReply( e.target.value);
    };

    const sendHandler = async (e:any) => {
        e.preventDefault();
        setLoading(true);        

        try {
            // Sending the request to the server
            const res = await fetch(`/api/blog/testimonials/reply`, {
                method: "POST",
                body: JSON.stringify({
                    author_id : data?.user?.id || '',
                    parent_id : ts.Testimonial._id,
                    blog_id : ts.Testimonial.blog_id,
                    message : Reply,
                }),
                headers: { "Content-Type": "application/json" },
            });

            // Extract response data
            const resData = await res.json();
            setLoading(false);

            // Handle error or success response
            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
                setReply('')
                setIsOpen(false)
            }
        } catch (err: any) {
            setLoading(false);
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        }
    }


    if(v === "large" ){
        return(
            <div>
                <div key={ts.user._id} className='flex gap-x-4 p-3 border border-Greyscale-100 rounded-3xl w-full'>                            
                    <ImageWithFallback src={ts.user.profile_picture || ""} alt={ts.user.email} style={"rounded-b-2xl w-14 h-14"} />
                    <div className='w-full'>
                        <p className='md:text-Body-SM-XSmall mb-1 lg:text-Body-SM-Small'>{ts.user.name} {ts.user.last_name}</p> 
                        <ShowRating rating={ts.Testimonial.rate} />
                        <p className='md:text-Body-RL-XSmall lg:text-Body-RL-Small mt-5 border border-Greyscale-100 py-2 px-4 w-full rounded-xl'>{ts.Testimonial.message}</p>
                        { userIsAdmin ?
                            <div className='w-full flex items-end justify-end mt-2 text-Greyscale-75 text-Body-RL-XSmall px-3'>
                                { !isOpen ? <p onClick={openHandler} className=' hover:text-Greyscale-600 cursor-pointer'>Reply</p> : <p onClick={openHandler} className='p-2 rounded-full w-8 mt-2 text-center h-8 text-neutral-50 bg-primary-300 hover:bg-primary-100'>X</p>}
                            </div> : null
                        }
                        {
                            userIsAdmin && isOpen ? <div className='-mt-3'>
                                <INPUT
                                    label="Reply:"
                                    type="text"
                                    name="message"
                                    value={Reply}
                                    placeholder="Enter your Reply here"
                                    changeHandler={changeHandler}
                                    textarea={true}
                                    style=''
                                />
                                {loading ? (
                                                <div className="w-full mt-5"><Loader w={8} /></div>
                                            ) : (
                                                <button 
                                                    onClick={(e) => sendHandler(e)} 
                                                    className='py-2 w-full mt-5 px-4 rounded-xl text-Body-MD-Small text-neutral-50 bg-primary-300 hover:bg-primary-100'
                                                >
                                                    Send Reply
                                                </button>
                                )}
                            </div> : null
                        }
                    </div>       
                </div>
                <div>
                    {
                        ts.replies.length ? <div className='flex flex-col gap-y-3 mt-3 pl-8'>{

                            ts.replies.map((rep:any) => <div key={rep.author._id} className='flex gap-x-4 p-3 border border-Greyscale-100 rounded-3xl bg-Secondary-0 w-full'>                            
                                    <ImageWithFallback src={rep.author.profile_picture || ""} alt={rep.author.email} style={"rounded-b-2xl w-14 h-14"} />
                                    <div className='w-full'>
                                        <p className='md:text-Body-SM-XSmall mb-1 lg:text-Body-SM-Small'>{rep.author.name} {rep.author.last_name}</p> 
                                        <p className='md:text-Body-RL-XSmall lg:text-Body-RL-Small mt-5 border border-Greyscale-100 py-2 px-4 w-full rounded-xl'>
                                            <p className='border border-Greyscale-100 py-2 px-4 w-full rounded-xl bg-Neutral'>{ts.Testimonial.message}</p>
                                            <p className='py-2 px-4 '>{rep.reply.message}</p>
                                        </p>
                                    </div> 
                            </div> )
                            
                        }</div> : null
                    }
                </div>
            </div>
        )
    } else{

    return (
        <div key={ts.user._id} className='p-3 border border-Greyscale-100 rounded-3xl w-full'>
                <div className='flex gap-x-4 '>
                    <ImageWithFallback src={ts.user.profile_picture || ""} alt={ts.user.email} style={"rounded-b-2xl w-14 h-14"} />
                    <div className=''>
                        {/* Show 'new' label for unread messages */}
                        <p className='md:text-Body-SM-XSmall mb-1 lg:text-Body-SM-Small'>{ts.user.name} {ts.user.last_name}</p> 
                        <ShowRating rating={ts.Testimonial.rate} />
                    </div>  
                </div>
                <p className='md:text-Body-RL-XSmall lg:text-Body-RL-Small mt-4 border border-Greyscale-100 py-2 px-4 w-full rounded-xl'>{ts.Testimonial.message}</p>
                { userIsAdmin ?
                    <div className='w-full flex items-end justify-end mt-2 text-Greyscale-75 text-Body-RL-XSmall px-3'>
                          { !isOpen ? <p onClick={openHandler} className=' hover:text-Greyscale-600 cursor-pointer'>Reply</p> : <p onClick={openHandler} className='p-2 rounded-full w-8 text-center h-8 text-neutral-50 bg-primary-300 hover:bg-primary-100'>X</p>}
                    </div> : null
                }
                {
                    userIsAdmin && isOpen ? <div className='-mt-3'>
                        <INPUT
                            label="Reply:"
                            type="text"
                            name="message"
                            value={Reply}
                            placeholder="Enter your Reply here"
                            changeHandler={changeHandler}
                            textarea={true}
                            style=''
                        />
                        {loading ? (
                                        <div className="w-full mt-5"><Loader w={8} /></div>
                                    ) : (
                                        <button 
                                            onClick={(e) => sendHandler(e)} 
                                            className='py-2 w-full mt-5 px-4 rounded-xl text-Body-MD-Small text-neutral-50 bg-primary-300 hover:bg-primary-100'
                                        >
                                            Send Reply
                                        </button>
                        )}
                    </div> : null
                }
        </div>
    );}
};

export default BlogTestimonialsCard;