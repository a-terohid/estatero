"use client"

import { FAQ_Interface } from '@/types/modelTypes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoTrashBinOutline } from 'react-icons/io5';
import { LuClipboardEdit } from 'react-icons/lu';
import { MdArrowDropDown } from 'react-icons/md';

// Component to display a single FAQ item with toggle, edit, and delete functionalities
const FAQ_Card = ({ FAQ }: { FAQ: FAQ_Interface }) => {

    // Destructure the FAQ properties
    const { question, answer, _id } = FAQ;

    const router = useRouter();

    // Function to handle FAQ deletion
    const deleteHandler = async () => {
        // Ask for confirmation before deletion
        if (confirm("Do you want to delete this FAQ?") === false) {
            return;
        }

        // Send DELETE request to the backend API
        const res = await fetch(`/api/FAQ/delete/${_id}`, {
            method: "DELETE",
        });

        const result = await res.json();
        console.log(result);

        // Show toast notification based on response
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.message);
            router.refresh(); // Refresh the page to update the list
        }
    }

    return (
        <div className='px-3 py-2 bg-primary-0 rounded-xl text-[10px] md:text-Body-RL-XSmall lg:text-Body-RL-Small'>
            <details className="group">
                <summary className="flex items-center justify-between cursor-pointer">
                    <p>{question}</p>

                    {/* Dropdown icon that rotates when the details are open */}
                    <span className="text-2xl lg:text-3xl ml-3 transition-transform duration-500 group-open:rotate-45">
                        <MdArrowDropDown />
                    </span>
                </summary>

                {/* Answer and action buttons (Edit/Delete) */}
                <div className='scale-up-ver-top mt-3 flex flex-col gap-y-1 ml-2 mb-2'>
                    <p>{answer}</p>

                    {/* Action buttons */}
                    <div className="flex items-center justify-center mt-5 gap-x-3">
                        {/* Delete button */}
                        <button
                            onClick={deleteHandler}
                            className="flex items-center justify-between gap-x-3 bg-Error-50 text-Error-200 hover:bg-Error-100 hover:text-Error-25 rounded-lg px-2 py-1"
                        >
                            Delete <IoTrashBinOutline className="text-lg" />
                        </button>

                        {/* Edit link */}
                        <Link
                            href={`/dashboard/FAQs/edit/${_id}`}
                            className="flex items-center justify-between gap-x-3 bg-Warning-50 hover:bg-Warning-100 hover:text-plus-green-4 rounded-lg px-2 py-1"
                        >
                            Edit <LuClipboardEdit className="text-lg" />
                        </Link>
                    </div>
                </div>
            </details>
        </div>
    );
};

export default FAQ_Card;