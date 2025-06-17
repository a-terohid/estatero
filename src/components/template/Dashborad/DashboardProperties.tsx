import PaginationButtons from '@/elements/buttons/PaginationButtons';
import DashboardPropertyCard from '@/elements/cards/DashboardPropertyCard';
import PropertiesDashboradSection from '@/elements/filter/PropertiesDashboradSection';
import { Agent_Interface } from '@/types/modelTypes';
import { DashboardProppertiesPage_interface } from '@/types/pagesProps';
import React from 'react';

const DashboardProperties = ({Properties , currentPage, totalPages , agents , totalproperties } : DashboardProppertiesPage_interface) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Properties:</h1>
            <PropertiesDashboradSection PATH='/dashboard/properties' agents={agents} />
            <div className='flex flex-col gap-y-3'>
                {
                    Properties.length ? Properties.map( pr => <DashboardPropertyCard 
                                                                    property={pr} 
                                                                    key={pr._id} 
                                                                    agent={agents.filter((ag) => pr.Agents_id.includes(ag._id || ''))} /> ) 
                    : <p>No properties found!</p>
                }
            </div>
            {/* Pagination control buttons */}
            { Properties.length ?  <PaginationButtons currentPage={currentPage} totalPages={totalPages} /> : null }
        </div>
    );
};

export default DashboardProperties;