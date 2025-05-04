import { DashboardItems } from "@/constants/DashboardItems";
import Agent from "@/models/agent";
import AgentsDashboardpage from "@/template/Dashborad/AgentsDashboardpage";
import { UserRole } from "@/types/enums/generalEnums";
import { UsersPageSearchParams_interface } from "@/types/StatesTypes";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// SEO metadata for the Users Dashboard Page
export const metadata: Metadata = {
    title: "Agents | Estatero Admin Panel",
    description:
      "Manage platform Agents, assign roles, and monitor user activity within the Estatero real estate admin dashboard.",
    keywords: [
      "Agents",
      "User Management",
      "Estatero",
      "Real Estate Platform",
      "Admin Dashboard",
      "User Roles",
      "CRM",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Agents | Estatero Admin Panel",
      description:
        "Manage platform Agents, assign roles, and monitor user activity within the Estatero real estate admin dashboard.",
      url: "https://estatero.vercel.app/dashboard/Agents",
      type: "website",
      images: [
        {
          url: "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: "Estatero Admin Agents Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Estatero",
      title: "Agents | Estatero Admin Panel",
      description:
        "Manage platform Agents, assign roles, and monitor user activity within the Estatero real estate admin dashboard.",
      images: ["/img/thumbnail.png"],
    },
  };
  

// Server component for rendering the Agents Dashboard Page
const page = async ({ searchParams }: { searchParams: UsersPageSearchParams_interface }) => {
    // Connect to MongoDB
    await connectDB();
  
    // Get the current session (logged-in user) and user
    const { session , user } = await checkSession();
    
    const validRoles = DashboardItems.find(item => item.name === 'Agents')?.accessibility;
    if (!user || !validRoles?.includes(user.role as UserRole)) {
        redirect("/dashboard/profile");
    }  

    // Destructure query params
    const { page, sort, email, fullName } = searchParams;
    const sortValue = sort === "asc" ? 1 : -1;
  
    // Create MongoDB filter object to fetch users
    const combinedFilter: any = {
      
    };
  
    // Filter by email (case-insensitive)
    if (email) {
      combinedFilter.email = { $regex: email, $options: "i" };
    }
  
    // Filter by full name (supports first, last, or full name)
    if (fullName) {
      combinedFilter.$or = [
        { name: { $regex: fullName, $options: "i" } },
        { last_name: { $regex: fullName, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$name", " ", "$last_name"] },
              regex: fullName,
              options: "i",
            },
          },
        },
      ];
    }
  
    // Pagination logic
    const LogsPerPage = 15;
    const Page = parseInt(page || "1");
    const totalUsers = await Agent.countDocuments(combinedFilter);
    const totalPages = Math.ceil(totalUsers / LogsPerPage) || 1;
    const currentPage = Math.min(Math.max(Page, 1), totalPages);
  
    // Fetch filtered and paginated user data from the database
    const agents = await Agent.find(combinedFilter)
      .skip((currentPage - 1) * LogsPerPage)
      .limit(LogsPerPage)
      .sort({ updatedAt: sortValue });

    
  
    // Render the page with agents and pagination info
    return ( 
      <AgentsDashboardpage
        users={agents}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    );
  };

export default page;