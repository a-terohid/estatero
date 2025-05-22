
import PaginationButtons from "@/elements/buttons/PaginationButtons";
import Logs_Card from "@/elements/cards/Logs_Card";
import LogFilterSection from "@/elements/filter/LogFilterSection";
import { LogDashboradPage_interface } from "@/types/pagesProps";

// Logs Dashboard Page Component
// Displays the logs with filtering options and pagination
const LogsDashboradPage = ({ logs, currentPage, totalPages }: LogDashboradPage_interface) => {

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page Title */}
            <h1 className='text-Heading-4 mb-6'>Logs:</h1>

            <div>
                {/* Filters Section (Sort, Action, Date Range) */}
                <LogFilterSection />

                {/* Logs List */}
                <div className="flex flex-col gap-y-2 mt-4">
                    {logs.length ? (
                        logs.map((log, index) => (
                            <Logs_Card log={log} key={index} />
                        ))
                    ) : (
                        <p className="text-secondary-500 border-b-2 border-secondary-500 w-fit">
                            No Logs found!
                        </p>
                    )}
                </div>

                {/* Pagination Controls */}
                <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default LogsDashboradPage;