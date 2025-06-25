"use client"

import { useState } from "react";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { ERROR } from "@/types/enums/MessageUnum";

const PublishProprety = ({id}: {id:any}) => {

     const [loading, setLoading] = useState(false);


    const PublishHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const publish = confirm("Do you want to publish this property?") 
            
        try {
            // Sending the request to the server
            const res = await fetch(`/api/property/publish/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ publish : publish }),
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
    };


    return (
        <div className=" flex justify-center">
        {

            loading ? <Loader w={9} /> : <button onClick={PublishHandler} className="bg-primary-100 hover:bg-primary-50 text-white w-fit text-Body-RL-XSmall px-2 py-1 rounded-md cursor-pointer" >publish</button>
        }    
        </div>
    );
};

export default PublishProprety;