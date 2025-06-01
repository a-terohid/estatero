import { property_TAGS } from '@/types/enums/generalEnums';
import React from 'react';

const TagForm = ({data , handler}:any) => {

    const { tags } = data
    const tagsOptions = Object.values(property_TAGS);

    return (
        <div className="lg:w-1/2 mt-8 flex flex-col gap-y-5">
            <div>
                    <h3 className=" mb-2 text-Body-MD-Small">Property Tags:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-2 text-Body-MD-Small bg-Neutral p-3 border rounded-lg ">
                        {tagsOptions.map(option => (
                            <label key={option} className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={tags.includes(option)}
                                className="w-4 h-4 appearance-none border rounded-md border-gray-500 checked:bg-Secondary-50 checked:border-Secondary-50 relative checked:after:content-['✔'] p-2 checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                                onChange={(e) => handler(option, e.target.checked)}
                            />
                            <span>{option}</span>
                            </label>
                        ))}
                    </div>
               </div>
        </div>
    );
};

export default TagForm;