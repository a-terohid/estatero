import { FAQ_Interface } from '@/types/modelTypes';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const FAQPage = ({ FAQs }: { FAQs: FAQ_Interface[] }) => {
    return (
        <div>
            {/* Hero section with background image, title, and subtitle */}
            <div className="bg-FAQPage-texture bg-cover bg-center py-8">
                <div className="container flex flex-col justify-between gap-y-4 mt-80">
                    {/* Page Title */}
                    <h3 className="text-Heading-4 md:text-Heading-2 text-Neutral">
                        Have Questions? We’ve Got Answers
                    </h3>

                    {/* Page Subtitle / Description */}
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Greyscale-100">
                        Quick Answers to Your Common Questions
                    </p>
                </div>
            </div>

            {/* Main content section with FAQ list and support call-to-action */}
            <div className="container py-8 md:py-16 lg:py-24">
                {/* FAQ Accordion List */}
                <div className="flex flex-col gap-y-3">
                    {FAQs &&
                        FAQs.map((faq) => (
                            <div key={faq._id} className="rounded-3xl border border-gray-200">
                                <details className="group">
                                    <summary className="flex items-center justify-between cursor-pointer px-4 py-3 md:py-4">
                                        {/* Question Title */}
                                        <p className="text-Heading-6 md:text-Heading-5">{faq.question}</p>

                                        {/* Toggle icon (rotates when open) */}
                                        <span className="lg:text-3xl ml-3 p-2 bg-primary-0 border rounded-lg hover:text-primary-50 group-open:bg-primary-100 group-open:text-Neutral">
                                            <IoIosArrowDown className="text-[18px] md:text-[22px] transition-transform duration-1000 group-open:rotate-180" />
                                        </span>
                                    </summary>

                                    {/* Answer Content */}
                                    <div className="scale-up-ver-top bg-Greyscale-75 rounded-b-2xl text-gray-700 flex flex-col gap-y-1 overflow-hidden px-4 py-3 md:py-4 text-Body-RL-Small md:text-Body-RL-Medium">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            </div>
                        ))}
                </div>

                {/* Support CTA box */}
                <div className="bg-Greyscale-75 text-gray-700 py-3 lg:py-5 px-6 flex flex-col md:flex-row md:justify-between gap-y-5 rounded-3xl mt-12 items-center">
                    <p className="text-Body-RL-Small md:text-Body-RL-Medium">
                        Still have questions? Contact our support team or explore our full FAQ page for more information.
                    </p>
                    <Link
                        href="/contact"
                        className="text-Neutral text-Body-RL-Small md:text-Body-RL-Medium bg-primary-300 rounded-full px-5 py-3 w-full md:w-fit text-center"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;