import User from "@/models/user";
import UsersDashboardPage from "@/template/Dashborad/UsersDashboardPage";
import { UserRole } from "@/types/enums/generalEnums";
import { UsersPageSearchParams_interface } from "@/types/StatesTypes";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Users | Estatero Admin Panel",
    description:
      "Manage platform users, assign roles, and monitor user activity within the Estatero real estate admin dashboard.",
    keywords: [
      "Users",
      "User Management",
      "Estatero",
      "Real Estate Platform",
      "Admin Dashboard",
      "User Roles",
      "CRM",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Users | Estatero Admin Panel",
      description:
        "Manage platform users, assign roles, and monitor user activity within the Estatero real estate admin dashboard.",
      url: "https://estatero.vercel.app/dashboard/users",
      type: "website",
      images: [
        {
          url: "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: "Estatero Admin Users Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Estatero",
      title: "Users | Estatero Admin Panel",
      description:
        "Manage platform users, assign roles, and monitor user activity within the Estatero real estate admin dashboard.",
      images: ["/img/thumbnail.png"],
    },
  };

const page = async ({searchParams} : { searchParams: UsersPageSearchParams_interface }) => {

    await connectDB()

    
    const LogsPerPage = 15;
    const Page = parseInt(searchParams.page || "1");
    const totalUsers =  await User.countDocuments({role : UserRole.CLIENT})
    
    const totalPages = Math.ceil(totalUsers / LogsPerPage) || 1;
    const currentPage = Math.min(Math.max(Page, 1), totalPages);
    
    const users = await User.find({role : UserRole.CLIENT})
        .skip((currentPage - 1) * LogsPerPage)
        .limit(LogsPerPage)
        .sort({ updatedAt: -1 });

    return ( <UsersDashboardPage 
                users={users} 
                totalPages={totalPages}
                currentPage={currentPage}
            />);
};

export default page;