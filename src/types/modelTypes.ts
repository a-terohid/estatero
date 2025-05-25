import { LogsActions, UserRole } from "./enums/generalEnums";

/**
 * Interface representing a system log entry
 */
export interface LOG_Interface {
    _id?: string;           // Optional unique identifier for the log
    title: string;          // Title or summary of the log entry
    action: LogsActions;    // Enum value indicating the action performed
    user_id: string;        // ID of the user who performed the action
    createdAt: Date;        // Timestamp when the log entry was created
}

/**
 * Interface representing a basic user in the system
 */
export interface User_Interface {
    _id?: string;               // Optional unique identifier
    email: string;              // User's email address
    password: string;           // Hashed password
    name?: string;              // First name (optional)
    last_name?: string;         // Last name (optional)
    phone_number?: string;      // Phone number (optional)
    profile_picture?: string;   // URL of profile picture (optional)
    liked_listings?: string[];  // IDs of listings the user liked
    role: UserRole;             // Role of the user (e.g., Admin, Agent, etc.)
    createdAt: Date;            // Date of user creation
    updatedAt?: Date;           // Date of last update
    resetPassword?: {           // Object for handling password reset
        token: string;          // Reset token
        expires: Date;          // Expiration date for the token
    };
}

/**
 * Interface representing a real estate agent, extended from a basic user
 */
export interface Agent_Interface {
    _id?: string;                   // Unique identifier (MongoDB ObjectId)
    email: string;                  // Agent's email address
    password: string;               // Agent's hashed password
    name?: string;                  // Agent's first name
    last_name?: string;             // Agent's last name
    phone_number?: string;          // Agent's phone number
    profile_picture?: string;       // URL to the agent's profile picture
    liked_listings?: string[];      // IDs of listings liked by the agent
    address?: string;               // Agent's physical address
    role: UserRole;                 // User role (e.g., Admin, Agent, User)
    createdAt: Date;                // Timestamp when the agent account was created
    updatedAt?: Date;               // Timestamp when the agent account was last updated
    resetPassword?: {               // Information for password reset
        token: string;              // Hashed reset token
        expires: Date;              // Expiration date and time for the token
    };
    bio?: string;                   // Short biography or description about the agent
    short_title?: string;            // A short professional title (e.g., "Top Realtor in LA")
    license_number: string;         // Official license number of the agent
    blogs?: string[];               // IDs of blogs/articles written by the agent
    experience_years?: number;      // Number of years of professional experience
    properties_listed?: string[];   // IDs of properties listed by the agent
    testimonials?: string[];        // IDs of testimonials or reviews received
    achievement?: string[];         // List of notable achievements or awards
    languages?: string[];           // Languages the agent can speak
    certifications?: string[];      // List of certifications obtained by the agent
    areas_served?: string[];         // Areas or cities where the agent offers services
    rating?: {                      // Agent's rating information
        points: number[];           // Array of individual rating points (e.g., [5, 4, 5])
        rate: number;               // Calculated average rating based on points
    };
    social?: {                      // Social media links
        instagram?: string;         // Instagram profile URL
        linkedin?: string;          // LinkedIn profile URL
    };
}

/**
 * Interface representing a testimonial left by a user for an agent
 */
export interface Agent_Testimonials_interface {
    _id?: string;
    user_id: string;               // ID of the user who submitted the testimonial
    agent_id: string;              // ID of the agent the testimonial is for
    rate: number;                  // Rating given by the user
    replies: string[];             // IDs of replies to this testimonial
    message: string;               // Text content of the testimonial
    createdAt: Date;
    updatedAt?: Date;
}

/**
 * Interface representing a reply to a testimonial or another reply
 */
export interface Agent_Testimonials_reply_interface {
    _id?: string;
    parent_id: string;            // ID of the testimonial or reply being replied to
    author_id: string;            // ID of the author of the reply
    isAgent: boolean;             // Whether the author is an agent or not
    parent_type: "reply" | "Testimonial"; // Specifies if the parent is a testimonial or a reply
    message: string;              // Text content of the reply
    createdAt: Date;
    updatedAt?: Date;
}


/**
 * Interface representing a message exchanged between two users
 */
export interface Message_Interface {
    _id?: string;           // Optional unique identifier for the message
    sender_id: string;      // ID of the user sending the message
    receiver_id: string;    // ID of the user receiving the message
    message: string;        // Content of the message
    is_read: boolean;       // Indicates whether the message has been read
    createdAt: Date;        // Timestamp of when the message was created
}



export interface FAQ_Interface {
    question: string
    answer : string
    _id ?: string
}


export interface Form_Interface {
    _id?: string;           // Optional unique identifier for the message
    full_name : string;
    email : string;
    location: string
    subject ?: string, 
    message: string;        // Content of the message
    is_read: boolean;       // Indicates whether the message has been read
    createdAt: Date;        // Timestamp of when the message was created
}

