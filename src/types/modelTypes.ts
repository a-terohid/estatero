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
    _id?: string;                   // Optional unique identifier
    email: string;                  // User's email address
    password: string;               // Hashed password
    name?: string;                  // First name (optional)
    last_name?: string;             // Last name (optional)
    phone_number?: string;          // Phone number (optional)
    profile_picture?: string;       // URL of profile picture (optional)
    liked_listings?: string[];      // IDs of listings the user liked
    role: UserRole;                 // Role of the user (e.g., Admin, Agent, etc.)
    createdAt: Date;                // Date of user creation
    updatedAt?: Date;               // Date of last update
    resetPassword?: {               // Object for handling password reset
        token: string;              // Reset token
        expires: Date;              // Expiration date for the token
    };
    bio?: string;                   // Short biography of the agent
    lincense_number: string;        // License number of the agent
    blogs?: string[];               // IDs of blogs written by the agent
    experience_years?: string;      // Number of years of experience
    properties_listed?: string[];   // IDs of properties listed by the agent
    rating?: {
        points: number[];           // Array of rating points (e.g., [4, 5, 3])
        rate: number;               // Calculated average rating
    };
    testimonials?: string[];        // IDs of testimonials received
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