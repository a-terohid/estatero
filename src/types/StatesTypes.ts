import { LogsActions } from "./enums/generalEnums";

/**
 * Interface representing data for user registration
 */
export interface registerData_interface {
    name: string;                // User's first name
    last_name: string;           // User's last name
    email: string;               // User's email address
    password: string;            // User's chosen password
    confirmPassword: string;     // Password confirmation for validation
}

/**
 * Interface representing validation errors for registration fields
 */
export interface registerDataError_interface {
    name_error: string;              // Error message for the name field
    last_name_error: string;         // Error message for the last name field
    email_error: string;             // Error message for the email field
    password_error: string;          // Error message for the password field
    confirmPassword_error: string;   // Error message for the confirm password field
}

/**
 * Interface representing login form data
 */
export interface loginData_interface {
    email: string;               // User's email address
    password: string;            // User's password
}

/**
 * Interface representing validation errors for login form
 */
export interface loginDataError_interface {
    email_error: string;         // Error message for the email field
    password_error: string;      // Error message for the password field
}

/**
 * Interface representing data for forgot password request
 */
export interface forgotPassword_interface {
    email: string;               // Email address to send reset instructions
}

/**
 * Interface representing validation errors for forgot password form
 */
export interface forgotPasswordError_interface {
    email_error: string;         // Error message for the email field
}

/**
 * Interface representing data for setting a new password
 */
export interface setPassword_interface {
    password: string;            // New password
    confirmPassword: string;     // Confirmation of the new password
}

/**
 * Interface representing validation errors for setting password
 */
export interface setPasswordError_interface {
    password_error: string;           // Error message for the password field
    confirmPassword_error: string;    // Error message for the confirm password field
}

/**
 * Interface representing editable user profile data
 */
export interface editProfile_interface {
    name: string;                // User's first name
    last_name: string;           // User's last name
    phone_number: string;        // User's phone number
}

/**
 * Interface representing validation errors for editing user profile
 */
export interface editProfileError_interface {
    name_error: string;              // Error message for the name field
    last_name_error: string;         // Error message for the last name field
    phone_number_error: string;      // Error message for the phone number field
}

/**
 * Interface representing editable agent profile data
 */
export interface editProfileAgent_interface {
    name: string;                   // Agent's first name
    last_name: string;              // Agent's last name
    phone_number: string;           // Agent's phone number
    address: string;                // Agent's address
    bio: string;                   // Short biography or description
    short_title: string;           // Short professional title
    license_number: string;        // Agent's license number
    experience_years: Number | string;  // Years of experience
    achievement: string[];         // List of achievements
    languages: string[];           // Languages spoken by the agent
    certifications: string[];      // Certifications obtained
    areas_served: string[];        // Areas or regions served
}

/**
 * Interface representing validation errors for editing agent profile
 */
export interface editProfileAgentError_interface {
    name_error: string;              // Error message for the name field
    last_name_error: string;         // Error message for the last name field
    phone_number_error: string;      // Error message for the phone number field
    bio_error: string;               // Error message for the bio field
    short_title_error: string;       // Error message for the short title field
    license_number_error: string;    // Error message for the license number field
    experience_years_error: string;  // Error message for the experience years field
}

/**
 * Interface representing filters for logs data
 */
export interface LogsFilter_interfasce {
    sort: 'sort' | 'esc' | "desc";      // Sorting order
    action: LogsActions | "action" | "all";  // Action filter
}

/**
 * Interface representing filters for users data
 */
export interface UserFilter_interfasce {
    sort: 'sort' | 'esc' | "desc";      // Sorting order
    email: string;                      // Email filter
    fullName: string;                   // Full name filter
}

/**
 * Interface representing search parameters for logs page
 */
export interface LogsPageSearchParams_interface {
    page?: string;                     // Current page number (optional)
    sort?: string;                    // Sort order (optional)
    action?: string;                  // Action filter (optional)
    startDate?: string;               // Start date for filtering (optional)
    endDate?: string;                 // End date for filtering (optional)
}

/**
 * Interface representing search parameters for users page
 */
export interface UsersPageSearchParams_interface {
    page?: string;                   // Current page number (optional)
    sort?: string;                   // Sort order (optional)
    email?: string;                  // Email filter (optional)
    fullName?: string;               // Full name filter (optional)
}

/**
 * Interface representing search parameters for messages page
 */
export interface MyMessagesPageSearchParams_interface {
    page?: string;                   // Current page number (optional)
    sort?: string;                   // Sort order (optional)
    email?: string;                  // Email filter (optional)
    startDate?: string;              // Start date filter (optional)
    endDate?: string;                // End date filter (optional)
    status?: string;                 // Message status filter (optional)
    is_read?: string;                // Read status filter (optional)
    fullName?: string;               // Full name filter (optional)
}

/**
 * Interface representing filters for messages data
 */
export interface MyMessagesFilter_interfasce {
    sort: 'sort' | 'esc' | "desc";  // Sorting order
    email: string;                  // Email filter
    fullName: string;               // Full name filter
    is_read: string;                // Read status filter
}

/**
 * Interface representing filters for properties on dashboard
 */
export interface PropertiesDashboardFilter_interfasce {
    sort: 'sort' | 'esc' | "desc";  // Sorting order
    id: string;                    // Property ID filter
    agent: string;                 // Agent filter
    status: string;                // Property status filter
    location: string;              // Location filter
    published: string;             // Published status filter
    property_type: string;         // Property type filter
    property_Category: string;     // Property category filter
    text_search: string;           // Text search filter
}

/**
 * Interface representing filters for properties
 */
export interface PropertiesFilter_interfasce {
    status: string;                // Property status filter
    location: string;              // Location filter
    property_type: string;         // Property type filter
    property_Category: string;     // Property category filter
    minPrice: string;              // Minimum price filter
    maxPrice: string;              // Maximum price filter
    minArea: string;               // Minimum area filter
    maxArea: string;               // Maximum area filter
    property_size_unit: string;    // Unit of measurement (e.g., sqm, sqft)
    bedrooms: string;              // Number of bedrooms filter
    bathrooms: string;             // Number of bathrooms filter
    parking_spaces: string;        // Number of parking spaces filter
    year_built: string;            // Year built filter
    tags: string;                  // Tags filter
}

/**
 * Interface representing search parameters for properties on dashboard
 */
export interface PropertiesDashboardSearchParams_interface {
    page?: string;                   // Current page number (optional)
    sort?: string;                   // Sort order (optional)
    id?: string;                    // Property ID filter (optional)
    agent?: string;                 // Agent filter (optional)
    status?: string;                // Property status filter (optional)
    location?: string;              // Location filter (optional)
    published?: string;             // Published status filter (optional)
    property_type?: string;         // Property type filter (optional)
    property_Category?: string;     // Property category filter (optional)
    text_search?: string;           // Text search filter (optional)
}

/**
 * Interface representing search parameters for properties
 */
export interface PropertiesSearchParams_interface {
    page?: string;                   // Current page number (optional)
    sort?: string;                   // Sort order (optional)
    status?: string;                // Property status filter (optional)
    location?: string;              // Location filter (optional)
    property_type?: string;         // Property type filter (optional)
    property_Category?: string;     // Property category filter (optional)
    minPrice?: string;              // Minimum price filter (optional)
    maxPrice?: string;              // Maximum price filter (optional)
    minArea?: number;               // Minimum area filter (optional)
    maxArea?: number;               // Maximum area filter (optional)
    property_size_unit?: "sqm" | "sqft"; // Unit of measurement (optional)
    bedrooms?: number;              // Number of bedrooms filter (optional)
    bathrooms?: number;             // Number of bathrooms filter (optional)
    parking_spaces?: number;        // Number of parking spaces filter (optional)
    year_built?: string;            // Year built filter (optional)
    tags?: string;                  // Tags filter (optional)
}

/**
 * Interface representing search parameters for blogs
 */
export interface BlogsSearchParams_interface {
    page?: string;                 // Current page number (optional)
    sort?: string;                 // Sort order (optional)
    title?: string;                // Blog title filter (optional)
    startDate?: string;            // Start date filter (optional)
    endDate?: string;              // End date filter (optional)
    published?: string;            // Published status filter (optional)
    autor_id?: string;             // Author ID filter (optional)
}