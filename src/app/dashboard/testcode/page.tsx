"use client"

import TiptapEditor from '@/module/TiptapEditor';
import React, { useState } from 'react';

const page = () => {

    const [post, setPost] = useState("");
    const [images, setImages] = useState<File[]>([]);


  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>test page:</h1>
            <div>
                <TiptapEditor content={post} onChange={onChange} setImages={setImages} />
            </div>
        </div>
    );
};

export default page;