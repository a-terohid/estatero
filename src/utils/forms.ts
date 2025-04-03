import { forgotPassword_interface, forgotPasswordError_interface, loginData_interface, loginDataError_interface, registerData_interface, registerDataError_interface } from '@/types/StatesTypes';
import { ERROR } from "@/types/enums/MessageUnum";

// Validates the registration form data and returns an object containing error messages.
export const RegisterFormsValidation = (data: registerData_interface, date_error: registerDataError_interface) : registerDataError_interface => {
   
    // Destructuring user input fields
    const { name, last_name, email, password, confirmPassword } = data;

    // Initializing error object with existing errors
    let errors: registerDataError_interface = {
        name_error: date_error.name_error,
        last_name_error: date_error.last_name_error,
        email_error: date_error.email_error,
        password_error: date_error.password_error,
        confirmPassword_error: date_error.confirmPassword_error
    };

    // Validate Name
    if (!name) {
        errors.name_error = ERROR.REQUIRED_FIELD;
    } else if (name.length < 3) {
        errors.name_error = ERROR.NAME_ATLEAST;
    } else {
        errors.name_error = "";
    }

    // Validate Last Name
    if (!last_name) {
        errors.last_name_error = ERROR.REQUIRED_FIELD;
    } else if (last_name.length < 3) {
        errors.last_name_error = ERROR.LASTNAME_ATLEAST;
    } else {
        errors.last_name_error = "";
    }

    // Validate Email
    if (!email) {
        errors.email_error = ERROR.REQUIRED_FIELD;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email_error = ERROR.INVALID_DATA;
    } else {
        errors.email_error = "";
    }

    // Validate Password
    if (!password) {
        errors.password_error = ERROR.REQUIRED_FIELD;
    } else if (password.length < 6) {
        errors.password_error = ERROR.PASSWORD_ATLEAST;
    } else {
        errors.password_error = "";
    }

    // Validate Confirm Password
    if (!confirmPassword) {
        errors.confirmPassword_error = ERROR.REQUIRED_FIELD;
    } else if (confirmPassword !== password) {
        errors.confirmPassword_error = ERROR.PASSWORD_DONT_MACH;
    } else {
        errors.confirmPassword_error = "";
    }

    return errors;
};


export const LoginFormsValidation = (data: loginData_interface, date_error: loginDataError_interface) : loginDataError_interface => {
   
    // Destructuring user input fields
    const { email, password } = data;

    // Initializing error object with existing errors
    let errors: loginDataError_interface = {
        email_error: date_error.email_error,
        password_error: date_error.password_error,
    };

    // Validate Email
    if (!email) {
        errors.email_error = ERROR.REQUIRED_FIELD;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email_error = ERROR.INVALID_DATA;
    } else {
        errors.email_error = "";
    }

    // Validate Password
    if (!password) {
        errors.password_error = ERROR.REQUIRED_FIELD;
    } else if (password.length < 6) {
        errors.password_error = ERROR.PASSWORD_ATLEAST;
    } else {
        errors.password_error = "";
    }

    return errors;
};


export const forgotPasswordFormsValidation = (data: forgotPassword_interface, date_error: forgotPasswordError_interface) : forgotPasswordError_interface => {
   
    // Destructuring user input fields
    const { email } = data;

    // Initializing error object with existing errors
    let errors: forgotPasswordError_interface = {
        email_error: date_error.email_error,
    };

    // Validate Email
    if (!email) {
        errors.email_error = ERROR.REQUIRED_FIELD;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email_error = ERROR.INVALID_DATA;
    } else {
        errors.email_error = "";
    }

    return errors;
};