import { UserRole } from "@/types/enums/generalEnums";
import { DashboardItem_interface } from "@/types/generalTypes";
import { IoMdPerson } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdAddHomeWork, MdHomeWork, MdLockReset } from "react-icons/md";
import { RiFootprintFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaBuildingUser, FaFileCircleQuestion, FaRegCircleQuestion } from "react-icons/fa6";
import { TbMessage } from "react-icons/tb";
import { LuMessagesSquare } from "react-icons/lu";


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
        name: "My messages", 
        href: "/dashboard/my_messages" , 
        accessibility: [ UserRole.AGENT, UserRole.AGENTADMIN , UserRole.AGENTOWNER],
        icon : <TbMessage />,
        children : []
    },
    { 
        name: "Properties", 
        href: "/dashboard/properties" , 
        accessibility: [UserRole.OWNER ,UserRole.AGENTOWNER , UserRole.AGENTADMIN , UserRole.ADMIN, UserRole.AGENT ],
        icon : <MdHomeWork />,
        children : [
            { 
                name: "Add property", 
                href: "/dashboard/properties/add" , 
                accessibility: [UserRole.AGENTOWNER , UserRole.AGENTADMIN , UserRole.AGENT ],
                icon : <MdAddHomeWork />,
                children : []
            },
        ]
    },
    { 
        name: "All messages", 
        href: "/dashboard/all_messages" , 
        accessibility: [ UserRole.OWNER , UserRole.AGENTOWNER],
        icon : <LuMessagesSquare />,
        children : []
    },
    { 
        name: "Users", 
        href: "/dashboard/users" , 
        accessibility: [ UserRole.OWNER ,UserRole.ADMIN , UserRole.AGENTOWNER],
        icon : <FaUserFriends />,
        children : []
    },
    { 
        name: "Agents", 
        href: "/dashboard/agents" , 
        accessibility: [ UserRole.OWNER ,UserRole.ADMIN , UserRole.AGENTOWNER , UserRole.AGENTADMIN],
        icon : <FaBuildingUser />,
        children : []
    },
    { 
        name: "Admins", 
        href: "/dashboard/admins" , 
        accessibility: [ UserRole.OWNER , UserRole.AGENTOWNER],
        icon : <RiAdminFill />,
        children : []
    },
    { 
        name: "FAQs", 
        href: "/dashboard/FAQs" , 
        accessibility: [UserRole.OWNER ,UserRole.AGENTOWNER ],
        icon : <FaRegCircleQuestion />,
        children : [
            { 
                name: "Add FAQ", 
                href: "/dashboard/FAQs/add" , 
                accessibility: [UserRole.OWNER ,UserRole.AGENTOWNER ],
                icon : <FaFileCircleQuestion />,
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
