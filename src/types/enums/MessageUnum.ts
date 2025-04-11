export enum ERROR {
    SERVER_ERROR = "There is error in server!",
    USER_EXIST = "This user already exists!",
    EMAIL_EXIST = "This email already exists!",
    CANT_FIND_USER = "This user cannot be found!",
    INVALID_DATA = "please enter a valid data!",
    INVALID_EMAIL = "please enter a valid email!",
    WRONG_PASSWORD = "Email or password is incorrect!",
    PROBLEM = "There is a Problem!",
    NO_USER = "There is no user!",
    ACCESS_DENIED = "access denied!",
    LOGIN = "please login first",
    REQUIRED_FIELD = "This field must be filled.",
    REQUIRED_NAME = "Name is required for sign-up.",
    INVALID_EMAIL_FORMAT = "Invalid email format.",
    NAME_ATLEAST = "Name must be at least 3 characters.",
    LASTNAME_ATLEAST = "Last name must be at least 3 characters.",
    PASSWORD_ATLEAST = "Password must be at least 6 characters.",
    PASSWORD_DONT_MACH = "Passwords do not match.",
    RESET_LINK_EXPIRED = "Your reset link has expired. Please request a new one.",
    INVALID_TOKEN = "Invalid token. Please try again.",
    OTP_REQUIRED = "OTP Code is required!",
}

export enum MESSAGE {
    NEW_USER = "User cteated successfully!",
    USER_DELETE = "User deleted successfully!",
    PASSWORD_RESET_EMAIL = "Password reset email sent successfully.",
    PASSWORD_RESET = "Password reset successfully.",
    VALID_TOKEN = "Valid token. you can reset your password.",
}

