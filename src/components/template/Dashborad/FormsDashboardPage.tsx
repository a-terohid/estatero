import PaginationButtons from '@/elements/buttons/PaginationButtons';
import Formscard from '@/elements/cards/Formscard';
import MyMessageFilterSection from '@/elements/filter/MyMessageFilterSection';
import { formpage_interface } from '@/types/pagesProps';
import React from 'react';

const FormsDashboardPage = ({forms , currentPage, totalPages } : formpage_interface) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Forms:</h1>
            <div>
                {/* Filter section for messages */}
                <MyMessageFilterSection  PATH="/dashboard/forms"  />
                {/* User list section */}
                <div className="flex flex-col gap-y-2 mt-4">
                    {forms.length ? (
                        // Render each user with DashboardUserCard
                        forms.map((msg, index) => (
                           <Formscard key={index} msg={msg}/>
                        ))
                    ) : (
                        
                        <p className="text-secondary-500 border-b-2 border-secondary-500 w-fit">
                            No Message found!
                        </p>
                    )}
                </div>

                {/* Pagination control buttons */}
                <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default FormsDashboardPage;