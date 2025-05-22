import PaginationButtons from '@/elements/buttons/PaginationButtons';
import ReadAllMessages from '@/elements/buttons/ReadAllMessages';
import MessageCard from '@/elements/cards/MessageCard';
import MyMessageFilterSection from '@/elements/filter/MyMessageFilterSection';
import { Message_Interface } from '@/types/modelTypes';
import { MymessagesPage_interface } from '@/types/pagesProps';
import React from 'react';

const My_Message = ({messages , currentPage, totalPages } : MymessagesPage_interface) => {

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>My Messages:</h1>
            <div>
                {/* Filter section for messages */}
                <MyMessageFilterSection  PATH="/dashboard/my_messages"  />
                <ReadAllMessages />
                {/* User list section */}
                <div className="flex flex-col gap-y-2 mt-4">
                    {messages.length ? (
                        // Render each user with DashboardUserCard
                        messages.map((msg, index) => (
                           <MessageCard key={index} msg={msg} my={true} />
                        ))
                    ) : (
                        // Message when no users are found
                        <p className="text-secondary-500 border-b-2 border-secondary-500 w-fit">
                            No User found!
                        </p>
                    )}
                </div>

                {/* Pagination control buttons */}
                <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );

};

export default My_Message;