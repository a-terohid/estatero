import { DashboardItems } from "@/constants/DashboardItems";
import { UserRole } from "@/types/enums/generalEnums";
import { DashboardLoyout_prop } from "@/types/pagesProps";
import Link from "next/link";

import { BsPersonCircle } from "react-icons/bs"
import { DashboardItem_interface } from "@/types/generalTypes";
import { roleStyles } from "@/constants/roleStyle";
import RenderDashboardMenuItem from "@/elements/RenderDashboardMenuItem";
const DashboardLoyout = ({ children , role , email } : DashboardLoyout_prop) => {
    return (
        <div>
            {/* Dashboard background section */}
            <div className=" bg-dashboardBG-texture bg-cover bg-top lg:bg-bottom py-8">
                {/* Dashboard title and description */}
                <div className=" flex flex-col md:flex-row justify-between gap-y-4 mt-80 container">
                    <h3 className="text-Heading-4 md:text-Heading-2 text-Neutral">Dashboard</h3>
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Greyscale-100">
                        Access and manage your personal information, saved items, and preferences all in one place.
                        Your dashboard makes it easy to stay organized, track your activity, and make the most of your experience on Louyt.
                    </p>
                </div>
            </div>

            {/* Dashboard content section */}
            <div className=' container flex flex-col lg:flex-row lg:gap-x-8 lg:gap-y-0 gap-y-6 mt-6 pb-10'>
                {/* Sidebar menu */}
                <div className='lg:flex hidden overflow-auto gap-x-2 flex-col gap-y-3 h-fit w-fit text-Greyscale-100 min-w-[248px] py-4 px-4 rounded-xl shadow-xl bg-Sky-300'>
                    {/* User info display */}
                    <div className='flex flex-col items-center border-b-2 pb-3'>
                        <BsPersonCircle className=" text-4xl mb-2 " /> {/* User icon */}
                        <p className=' mb-3'>{ email }</p> {/* Display user email */}
                        { role in roleStyles &&  // Check if the user role exists in the role styles
                            <p className={`px-3 py-[2px] text-Body-RL-Small rounded-md ${roleStyles[role].labelClass}`}>
                                {role} {/* Display the user role */}
                            </p>
                        }
                    </div>
                    <div>
                        <ul>
                            {/* Render menu items based on accessibility */}
                            {
                                DashboardItems.map( (item: DashboardItem_interface) => 
                                    item.accessibility.includes(UserRole.ALL) || item.accessibility.includes(role as UserRole) ? 
                                    <li key={item.href}>
                                        {/* If the menu item has children, render using RenderDashboardMenuItem */}
                                        {
                                            item?.children.length ?  <RenderDashboardMenuItem item={item} />  
                                            :
                                            <Link className='p-1 flex items-center gap-x-1' href={item.href}>{item.name}</Link>  /* Simple link for items without children */
                                        }
                                    </li> : null)  /* Only show items that the user has access to */
                            }
                        </ul>
                    </div>
                </div>

                {/* Main content area */}
                <div className='w-full rounded-xl shadow-xl bg-Greyscale-100'>
                    { children }  {/* Render the child content passed to the dashboard */}
                </div>
            </div>
        </div>
    );
};

export default DashboardLoyout;