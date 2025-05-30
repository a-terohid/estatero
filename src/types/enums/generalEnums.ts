export enum UserRole {
    CLIENT = "Client",
    AGENT = "Agent",
    ADMIN = "Admin",
    OWNER = "Owner",
    AGENTADMIN = "Agent/Admin",
    AGENTOWNER = "Agent/Owner",
    ALL = "all"
}


export enum LogsActions  {
    NEW_REGISTER = 'new user registered',
    NEW_REGISTER_GOOGLE = 'new google user registered',
    NEW_ADMIN = 'new Admin Promoted',
    NEW_AGENT = 'new Agent Promoted',
    NEW_MESSAGE = 'new Message Sended',
    NEW_FORM = 'new Form Message Sended',
    NEW_FAQ = 'new FAQ added',
    EDIT_FAQ = 'a FAQ edited',
    DELETE_FAQ = 'a FAQ deleted',
}


export enum Property_Types {
    RESIDENTIAL_SALE = 'Residential Sale',
    RESIDENTIAL_LEASE = 'Residential Lease',
    COMMERICIAL_SALE = 'Commercial Sale',
    COMMERICIAL_LEASE = 'Commercial Lease',
    LAND = 'Land',

}

export enum property_Categories {
    APARTMENT = 'Apartment',
    HOUSE = "House",
    CONDO = "Condo"
}

export enum property_Status {
    SOLD = "Sold",
    ACTIVE = "Active",
    PENDING = "Pending", 
    CLOSED = "Closed",
    COMMING = "Coming Soon",
    HOLD = "HOLD"
}

export enum property_TAGS {
    FEATURED = "Featured",
    HOT = "Hot"
}

export enum property_outdoor_details_features {
  BACK_YARD = "Back yard",
  FRONT_YARD = "Front yard",
  SWIMMING_POOL = "Swimming Pool",
  GARAGE_ATTACHED = "Garage Attached",
  PATIO = "Patio / Terrace",
  BARBECUE_AREA = "Barbecue Area",
  GARDEN = "Garden",
  PLAYGROUND = "Playground",
  GUEST_PARKING = "Guest Parking",
  OUTDOOR_SEATING = "Outdoor Seating Area",
  PERGOLA = "Pergola / Shade Structure"
}


export enum property_interior_details_features {
  EQUIPPED_KITCHEN = "Equipped Kitchen",
  MEDIA_ROOM = "Media Room",
  GYM = "Gym",
  LAUNDRY_ROOM = "Laundry Room",
  BUILT_IN_SOUND_SYSTEM = "Built-in Sound System",
  WOODEN_FLOOR = "Wooden Flooring",
  TILED_FLOOR = "Tiled Flooring",
  CARPET_FLOOR = "Carpet Flooring",
  HIGH_CEILINGS = "High Ceilings",
  SMART_LIGHTING = "Smart Lighting",
  LARGE_WINDOWS = "Large Windows"
}

export enum property_utilities_central_features {
  CENTRAL_AIR = "Central Air",
  NATURAL_GAS = "Natural Gas",
  ELECTRICITY = "Electricity",
  VENTILATION = "Ventilation",
  WATER_HEATER = "Water Heater",
  AIR_PURIFIER = "Air Purifier System",
  UNDERFLOOR_HEATING = "Underfloor Heating"
}

export enum property_other_features {
  WIFI = "WiFi",
  WASHER_DRYER = "Washer and Dryer",
  FIREPLACE = "Fireplace",
  SMOKE_DETECTORS = "Smoke Detectors",
  SECURITY_SYSTEM = "Security System",
  CCTV = "CCTV",
  SMART_LOCK = "Smart Lock",
  SECURITY_DOOR = "Security Door",
  ELEVATOR = "Elevator",
  DOUBLE_GLAZED_WINDOWS = "Double-glazed Windows",
  SMART_HOME_SYSTEM = "Smart Home System"
}