import { UserRole } from "./enums/generalEnums";
import { LOG_Interface, User_Interface } from "./modelTypes";
import { LogsPageSearchParams_interface } from "./StatesTypes";

export interface inputComponent_input {
    changeHandler : Function;
    value : string;
    label : string;
    type : string;
    name : string;
    placeholder : string
    textarea : boolean
    error ?: string;
    style ?: string
}


export interface LogoCP_props {
    color ?: string
    img_Width?: string
    fontsize?: string
}

export interface resetpassword_props {
    email : string
    token : string
    error : string
    expire :string
}


export interface DashboardLoyout_prop {
    children : React.ReactNode
    email: string,
    role : UserRole
}


export interface resetDate_interface {
    userEmail: string
    token : string
    expire: string
}

export interface LogDashboradPage_interface { 
    logs: LOG_Interface[]
    currentPage : number, 
    totalPages : number
}


export interface UsersDashboradPage_interface { 
    users: User_Interface[]
    currentPage : number, 
    totalPages : number
}