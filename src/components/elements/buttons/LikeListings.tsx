"use client"

import { useState } from "react";
import Loader from "../Loader";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import toast from "react-hot-toast";
import { ERROR } from "@/types/enums/MessageUnum";

const LikeListings = ({id , isliked}: any) => {

    const [loading, setLoading] = useState(false);

    const likeHandler = async (e: React.FormEvent) =>{
        e.preventDefault();
        setLoading(true);
            
        try {
            // Sending the request to the server
            const res = await fetch(`/api/property/favourite/${id}`, {
                method: "PATCH",
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
            }
        } catch (err: any) {
            setLoading(false);
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        }
    }

    return (
        <div className=" w-full flex justify-end">
        {

            loading ? <Loader w={8} /> : <p onClick={likeHandler} className="flex items-center px-2 py-1 rounded-md bg-Neutral gap-x-1 md:text-Body-MD-Small hover:bg-primary-50">{isliked ? <IoIosHeart /> : <IoIosHeartEmpty /> } {isliked ? 'Liked' : 'Like' }</p>
                                
        } 
        </div>
    );
};

export default LikeListings;