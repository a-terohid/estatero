import { LOG_Interface, Message_Interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";

/**
 * Defining the LogSchema for 
 */
const LogSchema = new Schema<Message_Interface>({
    sender_id: {
        type: String,
        required: true, 
    },
    receiver_id : {
        type: String,
        required: true, 
    },
    message: {
        type: String, 
        required: true, 
    },
    createdAt: {
        type: Date,
        required: true, 
    }
}, { collection: "messages", timestamps: true }); 

/**
 * Creates a Mongoose model for message.
 */

const Message = models?.Message || model("Message", LogSchema);

export default Message;
