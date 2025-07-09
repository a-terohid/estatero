import PaginationButtons from '@/elements/buttons/PaginationButtons';
import PropertyCard from '@/elements/cards/PropertyCard';
import { Property_Interface } from '@/types/modelTypes';
import { ProppertiesPage_interface } from '@/types/pagesProps';
import React from 'react';

const PropetiesPage = ({Properties , currentPage, totalPages , totalproperties } : ProppertiesPage_interface) => {

    let showPageHandler = false

    if( totalPages > 1) showPageHandler = true

    return (
        <div>
            {/* Hero section with background image and introductory text */}
            <div className="bg-Properties-texture bg-cover bg-bottom py-32">
                <div className="flex flex-col justify-center items-center text-center gap-y-4  container">
                    {/* Section title */}
                    <h3 className="text-Heading-4 md:text-Heading-2 text-Neutral">Find Your Perfect Home</h3>

                    {/* Short description under the title */}
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Greyscale-100">
                        Be the first to see what's just hit the market. Fresh opportunities await as we bring you the latest properties                    </p>
                </div>
            </div>
            <div className=' my-8 md:my-16 lg:my-24 container'>
                <div className='flex items-end justify-end mb-10 w-full'>
                    <p className='text-Body-MD-Small'>{totalproperties} Properties</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        Properties.length && Properties.map( (property : Property_Interface) => <PropertyCard key={property._id} property={property} /> )
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