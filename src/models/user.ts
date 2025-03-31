
import { UserRole } from "@/types/generalEnums";
import { User_Interface } from "@/types/modelTypes";
import { Schema, model, models } from "mongoose";


const UserSchema = new Schema<User_Interface>({
    email : {
        type: String,
        required : true,
        default : ""
    },
    password : {
        type : String,
        required: true,
        default : ""
    },
    name : {
        type : String,
        required: false,
        default : ""
    },
    last_name : {
        type : String,
        required: false,
        default : ""
    },
    phone_number : {
        type : String,
        required: false,
        default : ""
    },
    profile_picture : {
        type : String,
        required: false,
        default : ""
    },
    liked_listings : {
        type : [],
        required: false,
        default : ""
    },
    role : {
        type : String,
        required: true,
        default : UserRole.Client
    },
    createdAt: {
        type: Date,
        required: true, 
        default:  new Date()
    },
    updatedAt: {
        type: Date,
        required: true, 
        default: ""
    },
    resetPassword:{
        token : {
            type : String,
            required: false,
            default : ''
        },
        expires : {
            type : String,
            required: false,
            default : ""
        },
    }
    
} , { collection : "User" , timestamps: true })


const User = models.User || model("User", UserSchema);

export default User;