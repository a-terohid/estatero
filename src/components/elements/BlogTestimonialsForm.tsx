"use client";

import { useState } from "react";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaStarHalfStroke } from "react-icons/fa6";
import INPUT from "./INPUT";
import Loader from "./Loader";
import { checkSession } from "@/utils/CheckSession";
import toast from "react-hot-toast";
import { ERROR } from "@/types/enums/MessageUnum";
import { useSession } from "next-auth/react";

const BlogTestimonialsForm = ({blogid} : {blogid:string}) => {

    const [loading, setLoading] = useState(false);
    const { data } = useSession();
    const [Data, setData] = useState({
        message: "",
        rate: 0,
    });

    const changeHandler = (e: any) => {
        setData({ ...Data, [e.target.name]: e.target.value.trim() });
    };

    const sendHandler = async (e : any) => {
        e.preventDefault();
        setLoading(true);        

        try {
            // Sending the request to the server
            const res = await fetch(`/api/blog/testimonials`, {
                method: "POST",
                body: JSON.stringify({
                    user_id : data?.user?.id || '',
                    blog_id : blogid,
                    message : Data.message,
                    rate: Data.rate
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
                setData({
                    message: "",
                    rate: 0,
                })
            }
        } catch (err: any) {
            setLoading(false);
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        }

    }

  return (
    <div className="p-4 border border-Greyscale-100 w-full rounded-3xl">
        <p className="text-Body-MD-Small mb-2">Rate:</p>
        <div className="mb-3 ml-4">
            <Rating
            initialRating={Data.rate}
            onChange={(rate:any) => setData({ ...Data, rate })}
            fractions={2}
            fullSymbol={<FaStar className="text-yellow-400 text-2xl" />}
            emptySymbol={<FaRegStar className="text-gray-300 text-2xl" />}
            placeholderSymbol={<FaStarHalfStroke className="text-yellow-300 text-2xl" />}
        />
        </div>
        <INPUT
            label="Message:"
            type="text"
            name="message"
            value={Data.message}
            placeholder="Enter your message here"
            changeHandler={changeHandler}
            textarea={true}
            style=''
        />
        <div className=" w-full">
            {loading ? (
                <div className="w-full mt-5"><Loader w={8} /></div>
            ) : (
                <button 
                    onClick={(e) => sendHandler(e)} 
                    className='py-2 w-full mt-5 px-4 rounded-xl text-Body-MD-Small text-neutral-50 bg-primary-300 hover:bg-primary-100'
                >
                    Send Comment
                </button>
            )}
        </div>
    </div>
  );
};

export default BlogTestimonialsForm;