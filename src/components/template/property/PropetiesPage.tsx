import PaginationButtons from '@/elements/buttons/PaginationButtons';
import PropertyCard from '@/elements/cards/PropertyCard';
import ProppertiesPageFilterSection from '@/elements/filter/ProppertiesPageFilterSection';
import { Property_Interface } from '@/types/modelTypes';
import { ProppertiesPage_interface } from '@/types/pagesProps';
import Image from 'next/image';
import React from 'react';

const PropetiesPage = ({Properties , currentPage, totalPages , totalproperties } : ProppertiesPage_interface) => {

    let showPageHandler = false

    if( totalPages > 1) showPageHandler = true

    return (
        <div>
            {/* Hero section with background image and introductory text */}
            <div className="relative">
                {/* Hero Background Image */}
                <div className="absolute inset-0 -z-10">
                    <Image
                    src="/img/PropertiesBanner.png"
                    alt="Properties Hero Background"
                    fill
                    priority 
                    quality={70}
                    className="object-cover object-bottom"
                    />
                </div>

                {/* Hero Content */}
                <div className="py-48 container">
                    <div className="flex flex-col justify-center items-center gap-y-4 text-center mb-8">
                        <h3 className="text-Heading-4 md:text-Heading-2 lg:text-Heading-1 text-Neutral">Find Your Perfect Home</h3>
                        <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Greyscale-100">
                            Be the first to see what`s just hit the market. Fresh opportunities await as we bring you the latest properties
                        </p>
                    </div>
                    <ProppertiesPageFilterSection PATH='/property' />
                </div>
            </div>
            <div className=' my-8 md:my-16 lg:my-24 container'>
                <div className='flex items-end justify-end mb-10 w-full'>
                    <p className='text-Body-MD-Small'>{totalproperties} Properties</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        Properties.length ? 
                        Properties.map( (property : Property_Interface) => <PropertyCard key={property._id} property={property} />)
                        : <p>No Property Found!</p> 
                    }
                </div>
                <div className='mt-12'>
                    {
                        showPageHandler && <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
                    }
                </div>
            </div>
        </div>
    );
};

export default PropetiesPage;