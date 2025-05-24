"use client";

import INPUT from '@/elements/INPUT';
import Loader from '@/elements/Loader';
import { ERROR } from '@/types/enums/MessageUnum';
import { FAQ_Interface } from '@/types/modelTypes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const EditFAQPage = ({ FAQ }: { FAQ: FAQ_Interface }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State to manage form data
  const [data, setData] = useState({
    question: FAQ.question || "",
    answer: FAQ.answer || ""
  });

  const { question, answer } = data;

  // Handle input changes and update state
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value.trim() });
  };

  // Handle the form submission to edit the FAQ
  const HandlerEditFaq = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send PATCH request to update FAQ
      const res = await fetch(`/api/FAQ/edit/${FAQ._id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...data, _id: FAQ._id }), // Include ID for identification
        headers: { "Content-Type": "application/json" },
      });

      // Parse response
      const resData = await res.json();
      setLoading(false);

      // Handle success or error messages
      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success(resData.message);
        router.replace("/dashboard/FAQs"); // Redirect after successful edit
      }
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="px-5 py-5 md:px-7">
      <h1 className="text-Heading-4 mb-6">Edit FAQ:</h1>

      {/* FAQ edit form inputs */}
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

      {/* Submit button or loader */}
      <div className="flex items-center justify-center mt-6">
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={HandlerEditFaq}
            className="text-primary-0 bg-primary-100 rounded-xl py-3 text-Body-MD-Small w-full hover:bg-primary-50"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default EditFAQPage;