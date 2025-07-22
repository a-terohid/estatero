import { DashboardItems } from "@/constants/DashboardItems";
import Agent from "@/models/agent";
import Blog from "@/models/Blog";
import User from "@/models/user";
import BlogsDashboardpage from "@/template/Dashborad/BlogsDashboardpage";
import { UserRole } from "@/types/enums/generalEnums";
import { BlogsSearchParams_interface } from "@/types/StatesTypes";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blogs | Dashboard",
  description:
    "View, create, and manage all your blog posts from one centralized dashboard. Keep your content updated, organized, and engaging for your readers.",
  keywords: [
    "Blog Management",
    "Dashboard Blogs",
    "Manage Blog Posts",
    "Content Dashboard",
    "Edit Blogs",
    "Write Blogs",
    "Blog List",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Blogs | Dashboard",
    description:
      "View, create, and manage all your blog posts from one centralized dashboard. Keep your content updated, organized, and engaging for your readers.",
    url: "https://estatero.vercel.app/dashboard/blogs",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Blogs Page - Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Blogs | Dashboard",
    description:
      "View, create, and manage all your blog posts from one centralized dashboard. Keep your content updated, organized, and engaging for your readers.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async ({ searchParams }: { searchParams: BlogsSearchParams_interface }) => {
  
    // Connect to the MongoDB database
    await connectDB();

    // Check if the user session is valid and get user info
    const { session, user } = await checkSession();

    // Check if the user has permission to access the Properties dashboard
    const validRoles = DashboardItems.find(item => item.name === "Blogs")?.accessibility;
    if (!user || !validRoles?.includes(user.role as UserRole)) redirect("/dashboard/profile");

    const userIsAdmin = user.role.includes("Admin") || user.role.includes("Owner");

    // Destructure and provide default values to search parameters
    const { page = "1", sort = "desc", title , startDate , endDate , published , autor_id } = searchParams;
    const sortValue = sort === "asc" ? 1 : -1;

    // Build the date filter if both startDate and endDate are provided
    const dateFilter =
        startDate && endDate
        ? {
            $expr: {
                $and: [
                {
                    $gte: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                    startDate.slice(0, 10),
                    ],
                },
                {
                    $lte: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                    endDate.slice(0, 10),
                    ],
                },
                ],
            },
            }
        : {};

    // Create MongoDB filter object to fetch users
    const combinedFilter: any = {
      ...dateFilter
    };

    if (autor_id) {
        combinedFilter.autor_id = autor_id;
    }

     if (title) {
        combinedFilter.title = { $regex: title, $options: "i" };
    }

    if (published === "true") {
        combinedFilter.published = true;
    } else if (published === "false") {
        combinedFilter.published = false;
    }

    // Set pagination settings
    const BlogsPerPage = 15;
    const currentPage = Math.max(parseInt(page), 1);

    // Get the total number of matching properties
    const totalBlogs = await Blog.countDocuments(combinedFilter);

    // Calculate total pages and clamp current page within valid range
    const totalPages = Math.ceil(totalBlogs / BlogsPerPage) || 1;
    const clampedPage = Math.min(currentPage, totalPages);

    // Fetch the paginated and sorted list of properties
    const blogs = await Blog.find(combinedFilter)
    .skip((clampedPage - 1) * BlogsPerPage)
    .limit(BlogsPerPage)
    .sort({ createdAt : sortValue });
    
    const authors_id = await Blog.distinct("autor_id");

    const userAuthors = await User.find({ _id: { $in: authors_id } });
    const agentAuthors = await Agent.find({ _id: { $in: authors_id } });

    const authors = [...userAuthors, ...agentAuthors];

    return (<BlogsDashboardpage 
                blogs={blogs} 
                authors={authors} 
                userIsAdmin={userIsAdmin}
                totalBlogs={totalBlogs}
                totalPages={totalPages}
                currentPage={currentPage}  /> );
};

export default page;