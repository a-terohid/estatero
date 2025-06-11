import PropertiesDashboradSection from '@/elements/filter/PropertiesDashboradSection';
import { DashboardProppertiesPage_interface } from '@/types/pagesProps';
import React from 'react';

const DashboardProperties = ({Properties , currentPage, totalPages , agents , totalproperties } : DashboardProppertiesPage_interface) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Properties:</h1>
            <PropertiesDashboradSection PATH='/dashboard/properties' agents={agents} />
        </div>
    );
};

export default DashboardProperties;