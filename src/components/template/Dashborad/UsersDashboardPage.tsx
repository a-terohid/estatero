import {  UsersDashboradPage_interface } from "@/types/pagesProps";
import PaginationButtons from "@/elements/PaginationButtons";
import DashboardUserCard from "@/elements/DashboardUserCard";


const UsersDashboardPage = ({ users, currentPage, totalPages }: UsersDashboradPage_interface ) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page Title */}
            <h1 className='text-Heading-4 mb-6'>Users:</h1>
            <div>
                  
                <div className="flex flex-col gap-y-2 mt-4">
                    {users.length ? (
                        users.map((user, index) => (
                            <DashboardUserCard user={user} key={index} />
                        ))
                    ) : (
                        <p className="text-secondary-500 border-b-2 border-secondary-500 w-fit">
                            No User found!
                        </p>
                    )}
                </div>

                {/* Pagination Controls */}
                <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default UsersDashboardPage;