import { Form_Interface, LOG_Interface, Message_Interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";

/**
 * Defining the LogSchema for 
 */
const formSchema = new Schema<Form_Interface>({
    full_name: {
        type: String,
        required: true, 
    },
    email : {
        type: String,
        required: true, 
    },
    location : {
        type: String,
        required: true, 
    },
    subject : {
        type: String,
        required: false, 
    },
    message: {
        type: String, 
        required: true, 
    },
    is_read : {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true, 
    }
}, { collection: "messages", timestamps: true }); 

/**
 * Creates a Mongoose model for message.
 */

const Form = models?.Form || model("Form", formSchema);

export default Form;
