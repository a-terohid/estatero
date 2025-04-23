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
    // IDs of listings the user liked
    liked_listings: {
        type: [String],
        default: [],
    },
    // Role of the user (e.g., Admin, Agent, etc.)
    role: {
        type: String,
        required: true,
    },
    // Auto-generated creation date
    createdAt: {
        type: Date,
        required: true,
    },
    // Auto-generated update date (optional)
    updatedAt: {
        type: Date,
    },
    // Object for handling password reset (optional)
    resetPassword: {
        token: { type: String },
        expires: { type: Date },
    },
    // Short biography of the agent (optional)
    bio: {
        type: String,
    },
    // License number of the agent
    lincense_number: {
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
        type: String,
    },
    // IDs of properties listed by the agent (optional)
    properties_listed: {
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
    // IDs of testimonials left for the agent (optional)
    testimonials: {
        type: [String],
        default: [],
    }
}, {
    collection: "Agents", // MongoDB collection name
    timestamps: true // Automatically handles createdAt and updatedAt
});

// Create and export the model
const Agent = models?.Agent || model("Agent", AgentSchema);
export default Agent;