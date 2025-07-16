import LikeListings from '@/elements/buttons/LikeListings';
import PropertyCard from '@/elements/cards/PropertyCard';
import { Property_Interface } from '@/types/modelTypes';
import React from 'react';

const LikedPropertiesDashboardpage = ({properties}:{properties : Property_Interface[]}) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Liked Properties:</h1>
            <div className='mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                { properties.length ? properties.map( (property :Property_Interface ) => <div key={property._id}  className='rounded-2xl relative bg-Neutral'>
                    <PropertyCard property={property} />
                    <div className="top-4 right-4 absolute" ><LikeListings id={property._id} isliked={true} /></div>
                </div> )  : <p>You dont have liked properties</p>}
            </div>
        </div>
    );
};

export default LikedPropertiesDashboardpage;