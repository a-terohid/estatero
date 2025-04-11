import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import SetPasswordDahsboardPage from "@/template/Dashborad/SetPasswordDahsboardPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";

// Metadata for SEO and social sharing
export const metadata = {
    title: "Profile | Reset Password | DWLFNDR",
    description: "Secure your account with a fresh new password. Enter and confirm your new password below.",
    keywords: [
        "set password",
        "password reset",
        "account security",
        "DWLFNDR"
    ],
    openGraph: {
        title: "Profile | Reset Password | DWLFNDR",
        description: "Secure your account by setting a new password.",
        url: "https://estatero.vercel.app/dashboard/profile/reset-password",
        type: "website",
        images: [
            {
                url: "/img/thumbnail.png",
                width: 1200,
                height: 630,
                alt: "Set Password Page"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Set Password | DWLFNDR",
        description: "Enter and confirm your new password to secure your account.",
        images: ["/img/thumbnail.png"]
    }
};

// Server component for rendering the set password page
const page = async ({ searchParams }: any) => {
    const { id } = searchParams;

    // Connect to MongoDB
    await connectDB();

    let user = null;

    // Initial values to pass to the page
    let resetData = {
        userEmail: '',
        token: '',
        expire: '',
    };

    try {
        // If "id" is provided in the URL, use it to find the user
        if (id) {
            user = await User.findById(id);
            console.log("User found by ID:", user);
        } else {
            // Otherwise, try to get user from server session
            const session = await getServerSession(authOptions);
            console.log("Session:", session);

            // If no session or email, display error
            if (!session?.user?.email) {
                console.warn("No session or email found");
                return <div>Session not found. Please log in.</div>;
            }

            // Find the user by their session email
            user = await User.findOne({ email: session.user.email });
            console.log("User found by session email:", user);
        }

        // If user or resetPassword is missing, return error message
        if (!user || !user.resetPassword) {
            console.warn("User not found or missing resetPassword data");
            return <div>Invalid or expired reset link</div>;
        }

        // All good — extract reset password data
        resetData = {
            userEmail: user.email,
            token: user.resetPassword.token,
            expire: user.resetPassword.expires,
        };

    } catch (error) {
        // Catch any unexpected errors
        console.error("Error in reset-password page:", error);
        return <div>Something went wrong. Please try again later.</div>;
    }

    // Render the SetPasswordDashboardPage with the required props
    return (
        <SetPasswordDahsboardPage
            userEmail={resetData.userEmail}
            token={resetData.token}
            expire={resetData.expire}
        />
    );
};

export default page;
