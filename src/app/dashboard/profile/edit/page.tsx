import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import EditProfileDashboardPage from "@/template/Dashborad/EditProfileDashboardPage";
import { ERROR } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";

export const metadata = {
    title: "Profile | Edit Profile | DWLFNDR",
    description: "Update your name, phone number, and profile picture to keep your account up-to-date.",
    keywords: [
      "edit profile",
      "profile settings",
      "update account",
      "DWLFNDR"
    ],
    openGraph: {
      title: "Profile | Edit Profile | DWLFNDR",
      description: "Easily update your personal details and profile photo.",
      url: "https://estatero.vercel.app/dashboard/profile/edit",
      type: "website",
      images: [
        {
          url: "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: "Edit Profile Page"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Edit Profile | DWLFNDR",
      description: "Manage your profile information to keep your account current.",
      images: ["/img/thumbnail.png"]
    }
  };

const page = async ({ searchParams }: any) => {

    const { id } = searchParams;
    
        // Connect to MongoDB
        await connectDB();
    
        let user = null;
    
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
                    return <div className="px-5 py-5 md:px-7">Session not found. Please log in.</div>;
                }
    
                // Find the user by their session email
                user = await User.findOne({ email: session.user.email });
                console.log("User found by session email:", user);
            }
    
            // If user or resetPassword is missing, return error message
            if (!user || !user.resetPassword) {
                console.warn("User not found");
                return <div className="px-5 py-5 md:px-7">{ERROR.CANT_FIND_USER}</div>;
            }
    
            
        } catch (error) {
            // Catch any unexpected errors
            console.error("Error in reset-password page:", error);
            return <div className='px-5 py-5 md:px-7'>Something went wrong. Please try again later.</div>;
        }

    return ( <EditProfileDashboardPage user={user} /> );
};

export default page;