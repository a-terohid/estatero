import { UserRole } from "./enums/generalEnums";

export interface LOG_Interface {
    _id?: string;
    title: string;
    action: string;
    user_id: string;
    createdAt: Date;
}


export interface User_Interface {
    _id?: string;
    email: string;
    password: string;
    name?: string;
    last_name?: string;
    phone_number?: string;
    profile_picture?: string;
    liked_listings?: string[];
    role: UserRole;
    createdAt: Date;
    updatedAt?: Date;
    resetPassword?: {
        token: string;
        expires: Date;
    };
}