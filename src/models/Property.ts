import { Schema, model, models } from "mongoose";
import { Property_Interface } from "@/types/modelTypes";
import {property_Categories, 
        property_interior_details_features, 
        property_other_features, 
        property_outdoor_details_features, 
        property_Status, property_TAGS, 
        Property_Types, 
        property_utilities_central_features
} from "@/types/enums/generalEnums";


const PropertySchema = new Schema<Property_Interface>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    property_type: {
      type: String,
      enum: Object.values(Property_Types),
      required: true,
    },
    property_Category: {
      type: String,
      enum: Object.values(property_Categories),
      required: true,
    },
    area: { type: Number, required: true },
    property_size_unit: {
      type: String,
      enum: ["sqm", "sqft"],
      required: true,
    },

    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    parking_spaces: { type: Number, required: true },
    year_built: { type: String, required: true },

    Agents_id: [{ type: String, required: true }],
    status: {
      type: String,
      enum: Object.values(property_Status),
      required: true,
    },

    Location: {
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
      street: { type: String, required: true },
      unparsedAddress: { type: String, required: true },
      coordinates: {
        Latitude: { type: String, required: true },
        Longitude: { type: String, required: true },
      },
    },

    tags: [{
      type: String,
      enum: Object.values(property_TAGS),
      required: false,
    }],
    thumbnail: { type: String, required: false },
    images: [{ type: String, required: false }],
    images_dir: { type: String, required: false },
    floor_plan: { type: String, required: false },
    published: { type: Boolean, required: true , default : false },

    PublishedBY: {
      _id: { type: String, required: false , default : '' },
      email: { type: String, required: false , default: "" },
    },

    Rejected: { type: Boolean, required: false , default : false },
    RejectNUM: { type: Number, required: false , default : 0 },

    facts_features: {
      F_description: { type: String, required: true },
      outdoor_details: [
        {
          type: String,
          enum: Object.values(property_outdoor_details_features),
          required: true,
        },
      ],
      interior_details: [
        {
          type: String,
          enum: Object.values(property_interior_details_features),
          required: true,
        },
      ],
      utilities_central: [
        {
          type: String,
          enum: Object.values(property_utilities_central_features),
          required: true,
        },
      ],
      other: [
        {
          type: String,
          enum: Object.values(property_other_features),
          required: true,
        },
      ],
    },
  },
  {
    collection: "property",
    timestamps: true,
  }
);

const Property = models?.Property || model("Property", PropertySchema);
export default Property;