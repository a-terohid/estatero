"use client"

import { ERROR } from "@/types/enums/MessageUnum";
import { useState } from "react";
import toast from "react-hot-toast";
import { GoRead } from "react-icons/go";
import Loader from "../Loader";


const ReadMessage = ({_id}: {_id:string}) => {

    const [loading, setLoading] = useState(false);


    const readHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Sending the request to the server
            const res = await fetch(`/api/message/${_id}`, {
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
    };

    return (
        <div className=" w-full flex items-center justify-center mt-3">
        {

            loading ? <Loader w={22} /> : <p onClick={readHandler} className="flex items-center px-2 py-1 rounded-md bg-Success-50 gap-x-2 md:text-Body-MD-Small hover:text-Success-25 hover:bg-Success-200"><GoRead/> Read it</p>
                                
        } 
        </div>
    );
};

export default ReadMessage;