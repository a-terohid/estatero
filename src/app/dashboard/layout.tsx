import DashboardLoyout from "@/layout/DashboardLoyout";
import { ERROR } from "@/types/enums/MessageUnum";
import { checkSession } from "@/utils/CheckSession";


const layout =  async ({ children }: {children: React.ReactNode}) => {

    const { session , user } = await checkSession();

    if( !user ) {
        return( <div className='flex items-center justify-center h-[500px]' >
            <h3 className='font-bold text-2xl border-b-4 border-secondary-600 py-2' >{ERROR.PROBLEM}</h3>
        </div> )
    }

    return ( <DashboardLoyout role={user.role} email={user.email}>{ children }</DashboardLoyout> );
};

export default layout;