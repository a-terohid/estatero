import Logs_Card from "@/elements/Logs_Card";
import PaginationButtons from "@/elements/PaginationButtons";
import { LogDashboradPage_interface } from "@/types/pagesProps";

const LogsDashboradPage = ({ logs,  currentPage, totalPages  }: LogDashboradPage_interface) => {

        
    return (
        <div className='px-5 py-5 md:px-7'>
            <h1 className='text-Heading-4 mb-6'>Logs:</h1>
            <div>
            <div className="flex flex-col gap-y-2 mt-4">
                    {logs.length ? logs.map((log, index) => (
                                               <Logs_Card log={log} key={index} />
                                            ))
                    : <p className="text-secondary-500 border-b-2 border-secondary-500 w-fit">No Logs found!</p>
                    }
                </div>
                <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
            </div>            
        </div>
    );
};

export default LogsDashboradPage;