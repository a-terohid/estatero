import PropertiesDashboradSection from '@/elements/filter/PropertiesDashboradSection';
import React from 'react';

const DashboardProperties = ({agents}:any) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Properties:</h1>
            <PropertiesDashboradSection PATH='/dashboard/properties' agents={agents} />
        </div>
    );
};

export default DashboardProperties;