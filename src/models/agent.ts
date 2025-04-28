import { Agent_Interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";

// Define schema for Agent
const AgentSchema = new Schema<Agent_Interface>({
    // Email address of the agent
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Hashed password
    password: {
        type: String,
        required: true,
    },
    // First name (optional)
    name: {
        type: String,
    },
    // Last name (optional)
    last_name: {
        type: String,
    },
    // Phone number (optional)
    phone_number: {
        type: String,
    },
    // URL of profile picture (optional)
    profile_picture: {
        type: String,
    },
    // IDs of listings the agent liked
    liked_listings: {
        type: [String],
        default: [],
    },
    // Address of the agent (optional)
    address: {
        type: String,
    },
    // Role of the agent
    role: {
        type: String,
        required: true,
    },
    // Short biography (optional)
    bio: {
        type: String,
    },
    // Short professional title (optional)
    short_title: {
        type: String,
    },
    // License number
    license_number: {
        type: String,
        required: true,
    },
    // IDs of blogs written by the agent (optional)
    blogs: {
        type: [String],
        default: [],
    },
    // Number of years of experience (optional)
    experience_years: {
        type: Number,
    },
    // IDs of properties listed by the agent (optional)
    properties_listed: {
        type: [String],
        default: [],
    },
    // IDs of testimonials received by the agent (optional)
    testimonials: {
        type: [String],
        default: [],
    },
    // List of achievements (optional)
    achievement: {
        type: [String],
        default: [],
    },
    // Languages the agent can speak (optional)
    languages: {
        type: [String],
        default: [],
    },
    // Certifications obtained by the agent (optional)
    certifications: {
        type: [String],
        default: [],
    },
    // Areas served by the agent (optional)
    areas_served: {
        type: [String],
        default: [],
    },
    // Rating object (optional)
    rating: {
        points: {
            type: [Number],
            default: [],
        },
        rate: {
            type: Number,
            default: 0,
        }
    },
    // Reset password information (optional)
    resetPassword: {
        token: { type: String },
        expires: { type: Date },
    },
    // Social media links (optional)
    social: {
        instagram: { type: String },
        linkedin: { type: String },
    }
}, {
    collection: "Agents", // MongoDB collection name
    timestamps: true      // Automatically handles createdAt and updatedAt
});

// Create and export the model
const Agent = models?.Agent || model("Agent", AgentSchema);
export default Agent;