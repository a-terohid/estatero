import { Agent_Testimonials_interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";

// Define the schema for agent testimonials
const Agent_Testimonials_Schema = new Schema<Agent_Testimonials_interface>({
    // ID of the user who submitted the testimonial
    user_id: {
        type: String,
        required: true,
    },
    // ID of the agent the testimonial is for
    agent_id: {
        type: String,
        required: true,
    },
    // Rating given by the user
    rate: {
        type: Number,
        required: true,
    },
    // Array of reply IDs related to this testimonial
    replies: {
        type: [String],
        required: true,
        default: []
    },
    // Text content of the testimonial
    message: {
        type: String,
        required: true,
    },
    // Date the testimonial was created
    createdAt: {
        type: Date,
        required: true,
    },
    // Date the testimonial was last updated
    updatedAt: {
        type: Date,
        required: false,
    }
}, {
    collection: "AgentTestimonials", // MongoDB collection name
    timestamps: true // Automatically manages `createdAt` and `updatedAt`
});

// Create the model if it doesn't already exist
const AgentTestimonials = models?.AgentTestimonials || model("AgentTestimonials", Agent_Testimonials_Schema);

export default AgentTestimonials;