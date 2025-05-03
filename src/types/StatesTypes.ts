import { LogsActions } from "./enums/generalEnums";

export interface registerData_interface {
    name : string;
    last_name : string;
    email : string;
    password : string;
    confirmPassword : string;
}


export interface registerDataError_interface {
    name_error : string;
    last_name_error : string;
    email_error : string;
    password_error : string;
    confirmPassword_error : string;
}


export interface loginData_interface {
    email : string;
    password : string;
}


export interface loginDataError_interface {
    email_error : string;
    password_error : string;
}


export interface forgotPassword_interface {
    email : string;
}


export interface forgotPasswordError_interface {
    email_error : string;
}


export interface setPassword_interface {
    password : string;
    confirmPassword : string;
}


export interface setPasswordError_interface {
    password_error : string;
    confirmPassword_error : string;
}


export interface editProfile_interface {
    name : string;
    last_name : string , 
    phone_number : string;
}


export interface editProfileError_interface {
    name_error : string;
    last_name_error : string;
    phone_number_error : string;
}

export interface editProfileAgent_interface {
    name : string;
    last_name : string 
    phone_number : string;
    bio : string
    short_title : string
    license_number: string 
    experience_years: Number | string
    achievement: string[];
    languages: string[];
    certifications: string[];
    areas_served: string[];
}


export interface editProfileAgentError_interface {
    name_error: string,
    last_name_error: string,
    phone_number_error: string,
    bio_error : string,
    short_title_error : string,
    license_number_error: string , 
    experience_years_error: string
}


export interface LogsFilter_interfasce { 
    sort : 'sort' | 'esc' | "desc",
    action : LogsActions | "action" | "all"
}

export interface UserFilter_interfasce { 
    sort : 'sort' | 'esc' | "desc",
    email : string
    fullName : string
}


export interface LogsPageSearchParams_interface {
    page?: string, 
    sort ?: string,
    action ?: string,
    startDate ?:string, 
    endDate ?:string
}


export interface UsersPageSearchParams_interface {
    page?: string, 
    sort ?: string,
    email ?: string
    fullName ?: string
}