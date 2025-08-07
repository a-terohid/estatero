import { DashboardItems } from "@/constants/DashboardItems";
import Form from "@/models/form";
import FormsDashboardPage from "@/template/Dashborad/FormsDashboardPage";
import { UserRole } from "@/types/enums/generalEnums";
import { MyMessagesPageSearchParams_interface } from "@/types/StatesTypes";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Forms | Dashboard",
    description:
      "View  All Form messages in the dashboard. Filter messages by date, email, and more.",
    keywords: [
      "Form Messages",
      "User Dashboard",
      "Communication",
      "Messaging System",
      "Filter Messages",
      "Message Management",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Forms | Dashboard",
      description:
        "View all form messages in the dashboard. Filter messages by date, email, and more.",
      url: "https://yourdomain.com/dashboard/my-messages",
      type: "website",
      images: [
        {
          url: "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: "My Messages Page - User Dashboard",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@YourTwitterHandle",
      title: "My Messages | Dashboard",
      description:
        "View and manage your messages in the dashboard. Filter messages by date, email, and more.",
      images: ["/img/thumbnail.png"],
    },
  };

  

const page = async ({ searchParams }: { searchParams: MyMessagesPageSearchParams_interface }) => {
    // Connect to MongoDB
    await connectDB();
    
    // Get the current session (logged-in user) and user
    const { session , user } = await checkSession();
    
    const validRoles = DashboardItems.find(item => item.name === "Forms")?.accessibility;
    if (!user || !validRoles?.includes(user.role as UserRole)) redirect("/dashboard/profile");

    // Destructure query params with defaults
    const { page = "1", sort = "desc", email, startDate, endDate , is_read , fullName } = searchParams;
    const sortValue = sort === "asc" ? 1 : -1;

    // Date filter
    const dateFilter = startDate && endDate ? {
        $expr: {
            $and: [
                { $gte: [{ $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } }, startDate.slice(0, 10)] },
                { $lte: [{ $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } }, endDate.slice(0, 10)] }
            ]
        }
    } : {};

  // Filter object
    const combinedFilter: any = {
        ...dateFilter,
    };

    // Email filter (case-insensitive)
    if (email) {
        combinedFilter.email = { $regex: email, $options: "i" };
    }

    if (fullName) {
        combinedFilter.full_name = { $regex: fullName, $options: "i" };
    }

    // is_read filter
     if (is_read === "true") {
        combinedFilter.is_read = true;
    } else if (is_read === "false") {
        combinedFilter.is_read = false;
    }


    const formsPerPage = 15;
    const currentPage = Math.max(parseInt(page), 1);

    const totalforms = await Form.countDocuments(combinedFilter);
    const totalPages = Math.ceil(totalforms / formsPerPage) || 1;
    const clampedPage = Math.min(currentPage, totalPages);

    const forms = await Form.find(combinedFilter)
        .skip((clampedPage - 1) * formsPerPage)
        .limit(formsPerPage)
        .sort({ createdAt: sortValue });


    return (
        < FormsDashboardPage 
                forms={forms} 
                totalPages={totalPages} 
                currentPage={currentPage} />
    );
};

export default page;