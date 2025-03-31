import { LOG_Interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";

/**
 * Defining the LogSchema for storing user activity logs in the database.
 */
const LogSchema = new Schema<LOG_Interface>({
    title: {
        type: String,
        required: true, 
    },
    action: {
        type: String,
        required: true, 
    },
    user_id: {
        type: String, 
        required: true, 
    },
    createdAt: {
        type: Date,
        required: true, 
    }
}, { collection: "Logs", timestamps: true }); 

/**
 * Creates a Mongoose model for logs.
 */

const Log = models.Log || model("Log", LogSchema);

export default Log;
