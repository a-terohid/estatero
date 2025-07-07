"use client"

import { useState } from 'react';
import Loader from '../Loader';
import toast from 'react-hot-toast';
import { ERROR } from '@/types/enums/MessageUnum';
import { useRouter } from 'next/navigation';

const DeleteProprety = ({id}: {id:any}) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter(); // used for redirect after submission
    


     const DeleteHandler = async () => {
        const confirmDelete = confirm("Do you want to delete this property?");
        if (!confirmDelete) return;

        setLoading(true);

        try {
            const res = await fetch(`/api/property/delete/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            });

            const resData = await res.json();

            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
                router.replace("/dashboard/properties");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=" flex justify-center">
        {

            loading ? <Loader w={9} /> : <button onClick={DeleteHandler} className="bg-primary-100 hover:bg-primary-50 text-white w-fit text-Body-RL-XSmall px-2 py-1 rounded-md cursor-pointer" >delete</button>
        }    
        </div>
    );

};

export default DeleteProprety;