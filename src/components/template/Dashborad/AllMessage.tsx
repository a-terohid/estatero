
import PaginationButtons from '@/elements/buttons/PaginationButtons';
import MessageCard from '@/elements/cards/MessageCard';
import MyMessageFilterSection from '@/elements/filter/MyMessageFilterSection';
import { MymessagesPage_interface } from '@/types/pagesProps';
import React from 'react';

const AllMessage =  ({messages , currentPage, totalPages } : MymessagesPage_interface) => {

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>All Messages:</h1>
            <div>
                {/* Filter section for messages */}
                <MyMessageFilterSection  PATH="/dashboard/all_messages"  />
                {/* User list section */}
                <div className="flex flex-col gap-y-2 mt-4">
                    {messages.length ? (
                        // Render each user with DashboardUserCard
                        messages.map((msg, index) => (
                           <MessageCard key={index} msg={msg} my={false} />
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
export default AllMessage;