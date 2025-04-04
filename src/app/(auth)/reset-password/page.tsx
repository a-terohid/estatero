import User from "@/models/user";
import ResetPasswordPage from "@/template/forgot-password/ResetPasswordPage";
import { ERROR } from "@/types/enums/MessageUnum";
import { redirect } from "next/navigation";

const page = async ({ searchParams }: any) => {
    // Extract email and token from the URL search parameters
    const { email, token } = searchParams;

    if (!email) redirect("/forgot-password");

    // Find the user in the database using their email
    const user = await User.findOne({ email });

    // Retrieve the stored reset password token and expiration time for the user
    const userToken = user.resetPassword.token;
    const userExpires = user.resetPassword.expires;

    // Get the current timestamp
    const currentTime = new Date().getTime();

    // Check if the reset password token has expired
    const isExpired = currentTime > new Date(userExpires).getTime();

    let error;

    if (token) {
        // If the token is still valid, redirect the user to the login page
        if (!isExpired) {
            redirect("/login");
        } else {
            // If the token is expired, set the appropriate error message
            error = ERROR.RESET_LINK_EXPIRED;
        }
    }

    // Render the ResetPasswordPage component with the necessary props
    return <ResetPasswordPage email={email} token={userToken} expire ={userExpires} error={error || ""} />;
};

export default page;