/**
 * Enum representing possible user roles in the system
 */
export enum UserRole {
    CLIENT = "Client",                // Regular client or customer
    AGENT = "Agent",                  // Real estate agent
    ADMIN = "Admin",                  // Administrator with full permissions
    OWNER = "Owner",                  // Property owner
    AGENTADMIN = "Agent/Admin",       // Combined role: Agent and Admin
    AGENTOWNER = "Agent/Owner",       // Combined role: Agent and Owner
    ALL = "all"                      // Represents all roles
}

/**
 * Enum representing types of actions logged in the system
 */
export enum LogsActions  {
    NEW_REGISTER = 'new user registered',                    // New user registration
    NEW_REGISTER_GOOGLE = 'new google user registered',      // New user registered via Google
    NEW_PROPERTIES = 'new properties added',                 // New properties added to system
    NEW_BLOG = 'new blog added',                              // New blog post created
    NEW_BLOG_TESTIMONIALS = 'new Testimonial for blog added',// New testimonial added to blog
    NEW_BLOG_TESTIMONIALS_REPLY = 'new Testimonial reply for blog added', // Reply to a blog testimonial added
    PROPERTY_EDITED = 'property edited',                      // Property details edited
    PROPERTY_DELETED = 'property deleted',                    // Property deleted
    BLOG_DELETED = 'blog deleted',                            // Blog post deleted
    PROPERTY_PUBLISHED = 'property published',                // Property marked as published
    BLOG_PUBLISHED = 'Blog published',                        // Blog marked as published
    PROPERTY_REJECTED = 'property rejected',                  // Property rejected or disapproved
    BLOG_REJECTED = 'blog rejected',                          // Blog rejected or disapproved
    NEW_ADMIN = 'new Admin Promoted',                         // User promoted to admin role
    NEW_AGENT = 'new Agent Promoted',                         // User promoted to agent role
    NEW_MESSAGE = 'new Message Sended',                        // New message sent
    NEW_FORM = 'new Form Message Sended',                      // New form submission received
    NEW_FAQ = 'new FAQ added',                                // New FAQ added
    EDIT_FAQ = 'a FAQ edited',                                // Existing FAQ edited
    DELETE_FAQ = 'a FAQ deleted',                             // FAQ deleted
}

/**
 * Enum representing different property types
 */
export enum Property_Types {
    RESIDENTIAL_SALE = 'Residential Sale',      // Residential property for sale
    RESIDENTIAL_LEASE = 'Residential Lease',    // Residential property for lease/rent
    COMMERICIAL_SALE = 'Commercial Sale',       // Commercial property for sale
    COMMERICIAL_LEASE = 'Commercial Lease',     // Commercial property for lease/rent
    LAND = 'Land',                               // Land plot
}

/**
 * Enum representing property categories
 */
export enum property_Categories {
    APARTMENT = 'Apartment',    // Apartment category
    HOUSE = "House",            // House category
    CONDO = "Condo"             // Condominium category
}

/**
 * Enum representing the status of a property listing
 */
export enum property_Status {
    SOLD = "Sold",              // Property sold
    ACTIVE = "Active",          // Property currently active/listed
    PENDING = "Pending",        // Pending sale or action
    CLOSED = "Closed",          // Sale or listing closed
    COMMING = "Coming Soon",    // Coming soon listing
    HOLD = "HOLD"               // Listing on hold
}

/**
 * Enum representing special tags for properties
 */
export enum property_TAGS {
    FEATURED = "Featured",      // Featured property
    HOT = "Hot"                 // Hot listing / high demand
}

/**
 * Enum representing outdoor features of a property
 */
export enum property_outdoor_details_features {
  BACK_YARD = "Back yard",                // Backyard area
  FRONT_YARD = "Front yard",              // Front yard area
  SWIMMING_POOL = "Swimming Pool",        // Swimming pool feature
  GARAGE_ATTACHED = "Garage Attached",    // Attached garage
  PATIO = "Patio / Terrace",               // Patio or terrace space
  BARBECUE_AREA = "Barbecue Area",         // Barbecue or grill area
  GARDEN = "Garden",                      // Garden area
  PLAYGROUND = "Playground",              // Playground facility
  GUEST_PARKING = "Guest Parking",        // Parking for guests
  OUTDOOR_SEATING = "Outdoor Seating Area", // Outdoor seating area
  PERGOLA = "Pergola / Shade Structure"   // Pergola or shade structure
}

/**
 * Enum representing interior features of a property
 */
export enum property_interior_details_features {
  EQUIPPED_KITCHEN = "Equipped Kitchen",    // Fully equipped kitchen
  MEDIA_ROOM = "Media Room",                  // Media or home theater room
  GYM = "Gym",                                // Gym or fitness room
  LAUNDRY_ROOM = "Laundry Room",              // Laundry room
  BUILT_IN_SOUND_SYSTEM = "Built-in Sound System", // Integrated sound system
  WOODEN_FLOOR = "Wooden Flooring",           // Wooden floors
  TILED_FLOOR = "Tiled Flooring",              // Tiled floors
  CARPET_FLOOR = "Carpet Flooring",            // Carpeted floors
  HIGH_CEILINGS = "High Ceilings",             // High ceiling feature
  SMART_LIGHTING = "Smart Lighting",            // Automated or smart lighting
  LARGE_WINDOWS = "Large Windows"               // Large window installations
}

/**
 * Enum representing central utilities and features of a property
 */
export enum property_utilities_central_features {
  CENTRAL_AIR = "Central Air",               // Central air conditioning
  NATURAL_GAS = "Natural Gas",               // Natural gas availability
  ELECTRICITY = "Electricity",                // Electricity supply
  VENTILATION = "Ventilation",                // Ventilation system
  WATER_HEATER = "Water Heater",              // Water heating system
  AIR_PURIFIER = "Air Purifier System",       // Air purification system
  UNDERFLOOR_HEATING = "Underfloor Heating"   // Underfloor heating system
}

/**
 * Enum representing other miscellaneous property features
 */
export enum property_other_features {
  WIFI = "WiFi",                             // Wireless internet availability
  WASHER_DRYER = "Washer and Dryer",        // Laundry appliances
  FIREPLACE = "Fireplace",                   // Fireplace feature
  SMOKE_DETECTORS = "Smoke Detectors",       // Smoke detection system
  SECURITY_SYSTEM = "Security System",       // Security system installed
  CCTV = "CCTV",                            // Closed circuit TV cameras
  SMART_LOCK = "Smart Lock",                 // Smart locking system
  SECURITY_DOOR = "Security Door",           // Security door
  ELEVATOR = "Elevator",                     // Elevator/lift availability
  DOUBLE_GLAZED_WINDOWS = "Double-glazed Windows", // Double-pane windows for insulation
  SMART_HOME_SYSTEM = "Smart Home System"    // Integrated smart home automation
}