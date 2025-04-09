import DashboardLoyout from "@/layout/DashboardLoyout";
import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import { ERROR } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const layout =  async ({ children }: {children: React.ReactNode}) => {

    await connectDB();
    const session = await getServerSession( authOptions )
    if ( !session ) redirect("/signin")

    const user = await User.findOne({ email : session?.user?.email })

    if( !user ) {
        return( <div className='flex items-center justify-center h-[500px]' >
            <h3 className='font-bold text-2xl border-b-4 border-secondary-600 py-2' >{ERROR.PROBLEM}</h3>
        </div> )
    }

    return ( <DashboardLoyout role={user.role} email={user.email}>{ children }</DashboardLoyout> );
};

export default layout;