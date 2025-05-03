import Agent from "@/models/agent";
import User from "@/models/user";
import EditProfileAgentDashboardPage from "@/template/Dashborad/EditProfileAgentDashboardPage";
import EditProfileDashboardPage from "@/template/Dashborad/EditProfileDashboardPage";
import { ERROR } from "@/types/enums/MessageUnum";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";

// Metadata for SEO and social sharing
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

// Page component for editing profile
const page = async ({ searchParams }: any) => {

    const { id } = searchParams;
    
    // Connect to MongoDB database
    await connectDB();
    
    let user = null;
    
    try {
        // If an "id" is provided in the URL, find the user by ID
        if (id) {
            user = await User.findById(id) || await Agent.findById(id);
            console.log("User found by ID:", user);
        } else {
            // If no "id", check the session to get the logged-in user
            user = (await checkSession()).user;
        }

        // If user or resetPassword is missing, display an error message
        if (!user || !user.resetPassword) {
            console.warn("User not found or resetPassword not set.");
            return <div className="px-5 py-5 md:px-7">{ERROR.CANT_FIND_USER}</div>;
        }

    } catch (error) {
        // Catch unexpected errors during user fetch or session check
        console.error("Error fetching user data:", error);
        return <div className='px-5 py-5 md:px-7'>Something went wrong. Please try again later.</div>;
    }

    // Return the Edit Profile Page if user data is valid
    if (user.role?.includes("Agent")) return (<EditProfileAgentDashboardPage user={user} />);

    return (<EditProfileDashboardPage user={user} />);
};

export default page;