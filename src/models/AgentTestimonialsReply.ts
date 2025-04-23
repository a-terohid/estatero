import { Agent_Testimonials_reply_interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";

// Define the schema for agent testimonial replies
const Agent_Testimonials_Reply_schema = new Schema<Agent_Testimonials_reply_interface>({
    // ID of the parent comment or reply
    parent_id: {
        type: String,
        required: true,
    },
    // ID of the author (user or agent)
    author_id: {
        type: String,
        required: true,
    },
    // Boolean indicating whether the author is an agent
    isAgent: {
        type: Boolean,
        required: true,
    },
    // Indicates whether this reply is to a testimonial or another reply
    parent_type: {
        type: String, // Ideally: enum ["reply", "Testimonial"]
        required: true,
    },
    // The content of the reply
    message: {
        type: String,
        required: true,
    },
    // The creation date of the reply
    createdAt: {
        type: Date,
        required: true, // This is auto-handled by `timestamps: true`
    },
    // The last update date of the reply
    updatedAt: {
        type: Date,
        required: false, // Also auto-handled
    }
}, {
    collection: "AgentTestimonialsReplies", // Collection name in MongoDB
    timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

// Create the model if it doesn't already exist
const AgentTestimonialsReply = models?.AgentTestimonialsReply || model("AgentTestimonialsReply", Agent_Testimonials_Reply_schema);

export default AgentTestimonialsReply;