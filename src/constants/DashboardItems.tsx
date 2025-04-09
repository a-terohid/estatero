import { UserRole } from "@/types/enums/generalEnums";
import { DashboardItem_interface } from "@/types/generalTypes";
import { IoMdPerson } from "react-icons/io";

export const DashboardItems : DashboardItem_interface[] = [
    { 
        name: "Dashboard", 
        href: "/dashboard" , 
        accessibility: [UserRole.ALL],
        icon : <IoMdPerson/>,
        children : []
    },
    { 
        name: "Profile", 
        href: "/dashboard/profile" , 
        accessibility: [UserRole.ALL],
        icon : <IoMdPerson/>,
        children : [
            { 
                name: "Edite Profile", 
                href: "/dashboard/profile/edite" , 
                accessibility: [UserRole.ALL],
                icon : <IoMdPerson/>,
                children : []
            },
        ]
    },
];
