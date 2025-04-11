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

const page = async ({ searchParams }: any) => {
    // Get user ID from the search parameters if available
    const { id } = searchParams;

    // Connect to the database
    await connectDB();

    let user;

    // Object to hold reset data to pass to the page
    let resetData = {
        userEmail: '',
        token: '',
        expire: '',
    };

    // If ID is provided (e.g., from reset link), find user by ID
    if (id) {
        user = await User.findOne({ _id: id });
        resetData.userEmail = user.email;
    } else {
        // Otherwise, get current session and find user by email
        const session = await getServerSession(authOptions);
        user = await User.findOne({ email: session?.user?.email });
    }

    // Extract token and expiration date from user's reset password data
    const userToken = user.resetPassword.token;
    resetData.token = userToken;
    const userExpires = user.resetPassword.expires;
    resetData.expire = userExpires;

    // Render the set password dashboard page with necessary props
    return (
        <SetPasswordDahsboardPage
            userEmail={resetData.userEmail}
            token={resetData.token}
            expire={resetData.expire}
        />
    );
};

export default page;