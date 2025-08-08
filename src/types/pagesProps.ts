import { UserRole } from "./enums/generalEnums";
import { Agent_Interface, Blog_Interface, FAQ_Interface, Form_Interface, LOG_Interface, Message_Interface, Property_Interface, User_Interface } from "./modelTypes";
import { LogsPageSearchParams_interface } from "./StatesTypes";

/**
 * Interface for input component props
 */
export interface inputComponent_input {
    changeHandler: Function;       // Handler function for input changes
    value: string | number;        // Current value of the input
    label: string;                 // Label text for the input
    type: string;                  // Input type (e.g., text, number, email)
    name: string;                  // Name attribute for the input
    placeholder: string;           // Placeholder text inside the input
    textarea: boolean;             // If true, input is rendered as a textarea
    error?: string;                // Optional error message for validation
    style?: string;                // Optional CSS class or style string
}

/**
 * Interface for logo component properties
 */
export interface LogoCP_props {
    color?: string;                // Optional color for the logo
    img_Width?: string;            // Optional image width size
    fontsize?: string;             // Optional font size for text in the logo
}

/**
 * Interface for reset password component props
 */
export interface resetpassword_props {
    email: string;                 // User's email address
    token: string;                 // Password reset token
    error: string;                 // Error message, if any
    expire: string;                // Expiration time for the reset token
}

/**
 * Interface for dashboard layout properties
 */
export interface DashboardLoyout_prop {
    children: React.ReactNode;     // Nested child components or elements
    fullName: string;              // Full name of the current user
    role: UserRole;                // Role of the current user
}

/**
 * Interface for password reset date info
 */
export interface resetDate_interface {
    userEmail: string;             // Email of the user requesting reset
    token: string;                 // Reset token string
    expire: string;                // Token expiration time
}

/**
 * Interface for dashboard logs page data
 */
export interface LogDashboradPage_interface {
    logs: LOG_Interface[];         // Array of log entries
    currentPage: number;           // Current pagination page
    totalPages: number;            // Total number of pages available
}

/**
 * Interface for dashboard users page data
 */
export interface UsersDashboradPage_interface {
    users: User_Interface[];       // Array of user data
    currentPage: number;           // Current pagination page
    totalPages: number;            // Total number of pages available
}

/**
 * Interface for dashboard messages page data
 */
export interface MymessagesPage_interface {
    messages: Message_Interface[]; // Array of messages
    currentPage: number;           // Current pagination page
    totalPages: number;            // Total number of pages available
}

/**
 * Interface for form submissions page data
 */
export interface formpage_interface {
    forms: Form_Interface[];       // Array of submitted forms
    currentPage: number;           // Current pagination page
    totalPages: number;            // Total number of pages available
}

/**
 * Interface for dashboard properties page data
 */
export interface DashboardProppertiesPage_interface {
    Properties: Property_Interface[]; // Array of properties
    currentPage: number;               // Current pagination page
    totalPages: number;                // Total number of pages available
    agents: Agent_Interface[];         // Array of agents
    totalproperties: number;           // Total number of properties
    userIsAdmin: boolean;              // Flag indicating if current user is admin
}

/**
 * Interface for dashboard blogs page data
 */
export interface DashboardBlogsPage_interface {
    blogs: Blog_Interface[];           // Array of blogs
    authors: any;                     // Authors data (type unspecified)
    currentPage: number;               // Current pagination page
    totalPages: number;                // Total number of pages available
    totalBlogs: number;                // Total number of blog entries
    userIsAdmin?: boolean;             // Optional flag for admin user
}

/**
 * Interface for general properties page data
 */
export interface ProppertiesPage_interface {
    Properties: Property_Interface[]; // Array of properties
    currentPage: number;              // Current pagination page
    totalPages: number;               // Total number of pages available
    totalproperties: number;          // Total number of properties
}

/**
 * Interface for image modal component props
 */
export interface ImageModalProps_interface {
    show: boolean;                   // Whether the modal is visible
    title?: string;                  // Optional modal title text
    imagePriview?: string;           // URL of the preview image
    image?: File | null;             // Original image file object
    setImage?: (file: File | null) => void;       // Setter for image file
    setImagePreview?: (previewUrl: string | null) => void; // Setter for preview URL
    setShow?: (value: boolean) => void;           // Setter to show/hide modal
}

/**
 * Interface for array fields component props
 */
export interface ArrayFieldsProps_interface {
    state: any;                     // Current state object
    setState: React.Dispatch<React.SetStateAction<any>>; // State setter function
    value: string[];                // Array of string values
    name: string;                  // Name identifier for the field
    lable: string;                 // Label text (note: should be "label")
}

/**
 * Interface for sending message from agent form props
 */
export interface agentsSendMessageFromProps_interface {
    full_name: string;              // Full name of the sender
    phone: string | null;           // Phone number (nullable)
    imgSRC: string | null;          // Image source URL (nullable)
    agent_id: string;               // ID of the agent sending the message
}

/**
 * Interface for dashboard FAQs page data
 */
export interface FAQsDashboradPage_interface {
    FAQs: FAQ_Interface[];          // Array of FAQs
    currentPage: number;            // Current pagination page
    totalPages: number;             // Total number of pages available
}