// This directive marks the file as a Client Component in Next.js 13+
// Required when using hooks like useState, useRouter, or third-party libraries like react-hot-toast
"use client"

import INPUT from "@/elements/INPUT";
import Loader from "@/elements/Loader";
import { ERROR } from "@/types/enums/MessageUnum";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddFAQPage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [ data , setData ] = useState({
        question: "",
        answer : ""
    });

    const { question , answer } = data;

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value.trim() });
    };

    const HandlerAddFaq = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Sending the request to the server
            const res = await fetch("/api/FAQ", {
                method: "POST",
                body: JSON.stringify(data),
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
                router.replace("/dashboard/FAQs");
            }
        } catch (err: any) {
            setLoading(false);
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        }
    };

    return (
        <div className='px-5 py-5 md:px-7'>
            <h1 className='text-Heading-4 mb-6'>Add FAQ:</h1>
            <div className="lg:w-1/2 mt-8 flex flex-col gap-y-4">
                <INPUT
                    label="Question"
                    type="text"
                    name="question"
                    value={question}
                    placeholder="Enter question here"
                    changeHandler={changeHandler}
                    textarea={false}
                />
                <INPUT
                    label="Answer"
                    type="text"
                    name="answer"
                    value={answer}
                    placeholder="Enter answer here"
                    changeHandler={changeHandler}
                    textarea={true}
                />
            </div>
            <div className='flex items-center justify-center mt-6'>
                {loading ? (
                    <Loader />
                ) : (
                    <button
                        onClick={HandlerAddFaq}
                        className="text-primary-0 bg-primary-100 rounded-xl py-3 text-Body-MD-Small w-full hover:bg-primary-50"
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddFAQPage;