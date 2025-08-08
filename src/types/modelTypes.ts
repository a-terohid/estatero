import { LogsActions, property_Categories, property_interior_details_features, property_other_features, property_outdoor_details_features, property_Status, property_TAGS, Property_Types, property_utilities_central_features, UserRole } from "./enums/generalEnums";

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


/**
 * Interface representing a frequently asked question (FAQ)
 */
export interface FAQ_Interface {
    question: string;           // Question text
    answer: string;             // Answer text
    _id?: string;               // Optional unique identifier
}

/**
 * Interface representing a contact or inquiry form submission
 */
export interface Form_Interface {
    _id?: string;               // Optional unique identifier
    full_name: string;          // Full name of the person submitting the form
    email: string;              // Email address of the sender
    location: string;           // Location of the sender
    subject?: string;           // Subject of the message (optional)
    message: string;            // Message content
    is_read: boolean;           // Flag to check if the message has been read
    createdAt: Date;            // Timestamp of form submission
}

/**
 * Interface representing the location details of a property
 */
export interface Property_location_interface {
    country: string;            // Country name
    state: string;              // State or province
    city: string;               // City name
    zipcode: string;            // Postal code
    street: string;             // Street address
    unparsedAddress: string;    // Full address string (unstructured)
    coordinates: {
        Latitude: string;       // Geographic latitude
        Longitude: string;      // Geographic longitude
    };
}

/**
 * Interface representing a real estate property
 */
export interface Property_Interface {
    _id?: string;                                      // Optional unique identifier
    title: string;                                     // Title of the property listing
    description: string;                               // Full description of the property
    price: number;                                     // Listing price
    property_type: Property_Types;                     // Enum for type (e.g., apartment, house)
    property_Category: property_Categories;            // Enum for category (e.g., sale, rent)
    area: number;                                      // Area size of the property
    property_size_unit: "sqm" | "sqft";                // Unit for area (square meters or feet)
    bedrooms: number;                                  // Number of bedrooms
    bathrooms: number;                                 // Number of bathrooms
    parking_spaces: number;                            // Number of parking spaces
    year_built: string;                                // Construction year
    Agents_id: string[];                               // IDs of associated agents
    status: property_Status;                           // Enum indicating status (e.g., available, sold)
    Location: Property_location_interface;             // Detailed location object
    tags?: property_TAGS[];                            // Optional array of tags (e.g., "sea view")
    thumbnail: string;                                 // Thumbnail image URL
    images: string[];                                  // Array of image URLs
    images_dir: string;                                // Directory path where images are stored
    floor_plan?: string;                               // Optional floor plan image URL
    published: boolean;                                // If the property is published
    createdAt: Date;                                   // Creation date
    updatedAt?: Date;                                  // Last updated timestamp
    PublishedBY?: {                                    // User who published the property
        _id: string;
        email: string;
    };
    Rejected: boolean;                                 // Flag indicating if the property was rejected
    RejectNUM: number;                                 // Count of rejections
    facts_features: {                                  // Object holding various features
        F_description: string;                         // General description of features
        outdoor_details: property_outdoor_details_features[];  // Outdoor feature enums
        interior_details: property_interior_details_features[]; // Interior feature enums
        utilities_central: property_utilities_central_features[]; // Utility features
        other: property_other_features[];              // Other miscellaneous features
    };
}

/**
 * Interface representing a blog post
 */
export interface Blog_Interface { 
    _id?: string;                                       // Optional unique blog ID
    title: string;                                     // Title of the blog
    description: string;                               // Blog content in HTML or rich text
    autor_id: string;                                  // ID of the author (user or agent)
    thumbnails: string;                                // Thumbnail image URL
    images: string[];                                  // Array of image URLs
    published: boolean;                                // Whether blog is published
    createdAt: Date;                                   // Date of creation
    updatedAt?: Date;                                  // Optional update timestamp
    PublishedBY: {                                     // Publisher details
        userId: string;                                // Publisher user ID
        email: string;                                 // Publisher email
    };
    testimonials: string[];                            // Array of testimonial IDs
}

/**
 * Interface representing a testimonial left on a blog
 */
export interface Blog_Testimonials_interface {
    _id?: string;              // Optional testimonial ID
    user_id: string;           // ID of the user leaving the testimonial
    blog_id: string;           // ID of the blog the testimonial is for
    rate: number;              // Rating (e.g., 1-5)
    replies: string[];         // Array of reply IDs
    message: string;           // Testimonial content
    createdAt: Date;           // Creation date
    updatedAt?: Date;          // Optional last update
}
 

export interface Blog_Testimonials_reply_interface {
    _id?: string;                  // Optional testimonial ID
    parent_id: string;            // ID of the testimonial or reply being replied to
    author_id: string;            // ID of the author of the reply
    message: string;              // Text content of the reply
    createdAt: Date;
    updatedAt?: Date;
}