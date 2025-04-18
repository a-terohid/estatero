import { UserRole } from "@/types/enums/generalEnums";
import { DashboardItem_interface } from "@/types/generalTypes";
import { IoMdPerson } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLockReset } from "react-icons/md";
import { RiFootprintFill } from "react-icons/ri";



export const DashboardItems : DashboardItem_interface[] = [
    { 
        name: "Dashboard", 
        href: "/dashboard" , 
        accessibility: [UserRole.ALL],
        icon : <LuLayoutDashboard/>,
        children : []
    },
    { 
        name: "Profile", 
        href: "/dashboard/profile" , 
        accessibility: [UserRole.ALL],
        icon : <IoMdPerson/>,
        children : [
            // { 
            //     name: "Profile", 
            //     href: "/dashboard/profile" , 
            //     accessibility: [UserRole.ALL],
            //     icon : <IoMdPerson/>,
            //     children : []
            // },
            { 
                name: "Edit Profile", 
                href: "/dashboard/profile/edit" , 
                accessibility: [UserRole.ALL],
                icon : <FiEdit/>,
                children : []
            },
            { 
                name: "Reset Password", 
                href: "/dashboard/profile/reset-password" , 
                accessibility: [UserRole.ALL],
                icon : <MdLockReset />,               
                children : []
            },
        ]
    },
    { 
        name: "Logs", 
        href: "/dashboard/logs" , 
        accessibility: [ UserRole.OWNER ,UserRole.ADMIN , UserRole.AGENTADMIN , UserRole.AGENTOWNER],
        icon : <RiFootprintFill/>,
        children : []
    },
];
