import DashboardUserCard from '@/elements/DashboardUserCard';
import PaginationButtons from '@/elements/PaginationButtons';
import UsersFilterSection from '@/elements/UsersFilterSection';
import { UsersDashboradPage_interface } from '@/types/pagesProps';
import React from 'react';

const AgentsDashboardpage = ({ users, currentPage, totalPages }: UsersDashboradPage_interface ) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Heading-4 mb-6'>Agents:</h1>

            <div>
                {/* Filter section for users */}
                <UsersFilterSection PATH="/dashboard/agents" />

                {/* User list section */}
                <div className="flex flex-col gap-y-2 mt-4">
                    {users.length ? (
                        // Render each user with DashboardUserCard
                        users.map((user, index) => (
                            <DashboardUserCard user={user} key={index} PATH="/dashboard/agents" />
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

export default AgentsDashboardpage;