import { UserRole } from "./enums/generalEnums";
import { Agent_Interface, FAQ_Interface, LOG_Interface, Message_Interface, Property_Interface, User_Interface } from "./modelTypes";
import { LogsPageSearchParams_interface } from "./StatesTypes";

export interface inputComponent_input {
    changeHandler : Function;
    value : string | number;
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

export interface MymessagesPage_interface { 
    messages: Message_Interface[]
    currentPage : number, 
    totalPages : number
}


export interface DashboardProppertiesPage_interface { 
    Properties: Property_Interface[]
    currentPage : number, 
    totalPages : number
    agents : Agent_Interface[],
    totalproperties : number
}




export interface ImageModalProps_interface {
    show: boolean; // Determines whether the modal is visible
    title?: string; // Optional title of the modal
    imagePriview?: string; // Preview image URL
    image?: File | null; // Original image file
    setImage?: (file: File | null) => void;
    setImagePreview?: (previewUrl: string | null) => void;
    setShow?: (value: boolean) => void;
}

export interface ArrayFieldsProps_interface {
    state: any;
    setState: React.Dispatch<React.SetStateAction<any>>;
    value: string[];
    name: string;
    lable: string;
}


export interface agentsSendMessageFromProps_interface { 
    full_name : string , 
    phone : string | null , 
    imgSRC: string  | null, 
    agent_id: string 
}

export interface FAQsDashboradPage_interface { 
    FAQs: FAQ_Interface[]
    currentPage : number, 
    totalPages : number
}
