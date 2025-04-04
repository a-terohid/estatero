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
