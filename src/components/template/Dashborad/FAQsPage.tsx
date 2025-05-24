import PaginationButtons from '@/elements/buttons/PaginationButtons';
import FAQ_Card from '@/elements/cards/FAQ_Card';
import { FAQsDashboradPage_interface } from '@/types/pagesProps';
import React from 'react';

// The main component for displaying the FAQ list along with pagination controls
const FAQsPage = ({ FAQs, currentPage, totalPages }: FAQsDashboradPage_interface) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page Title */}
            <h1 className='text-Heading-4 mb-6'>FAQs:</h1>
            
            <div>
                {/* FAQ Items */}
                <div className="flex flex-col gap-y-2 mt-4">
                    {FAQs.length ? (
                        FAQs.map((faq, index) => (
                            // Render each FAQ card
                            <FAQ_Card FAQ={faq} key={index} />
                        ))
                    ) : (
                        // Fallback message when there are no FAQs
                        <p className="text-secondary-500 border-b-2 border-secondary-500 w-fit">
                            No FAQs found!
                        </p>
                    )}
                </div>

                {/* Pagination controls to navigate through FAQ pages */}
                <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default FAQsPage;