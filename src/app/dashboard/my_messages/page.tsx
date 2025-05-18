import { DashboardItems } from '@/constants/DashboardItems';
import Message from '@/models/message';
import My_Message from '@/template/Dashborad/My_Message';
import { UserRole } from '@/types/enums/generalEnums';
import { MyMessagesPageSearchParams_interface } from '@/types/StatesTypes';
import { checkSession } from '@/utils/CheckSession';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
    title: "My Messages | Dashboard",
    description:
      "View and manage your messages in the dashboard. Filter messages by date, email, and more.",
    keywords: [
      "Messages",
      "User Dashboard",
      "Communication",
      "Messaging System",
      "Filter Messages",
      "Message Management",
    ],
    robots: "index, follow",
    openGraph: {
      title: "My Messages | Dashboard",
      description:
        "View and manage your messages in the dashboard. Filter messages by date, email, and more.",
      url: "https://yourdomain.com/dashboard/my-messages",
      type: "website",
      images: [
        {
          url: "/img/my-messages-thumbnail.png",
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
      images: ["/img/my-messages-thumbnail.png"],
    },
  };

const page = async ({ searchParams }: { searchParams: MyMessagesPageSearchParams_interface }) => {
    // Connect to MongoDB
    await connectDB();
    
    // Get the current session (logged-in user) and user
    const { session , user } = await checkSession();
    
    const validRoles = DashboardItems.find(item => item.name === "My messages")?.accessibility;
    if (!user || !validRoles?.includes(user.role as UserRole)) redirect("/dashboard/profile");

    // Destructure query params with defaults
    const { page = "1", sort = "desc", email, startDate, endDate , is_read } = searchParams;
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
        receiver_id: user._id,
        ...dateFilter,
    };

    // Email filter (case-insensitive)
    if (email) {
        combinedFilter.email = { $regex: email, $options: "i" };
    }

    // is_read filter
     if (is_read === "true") {
        combinedFilter.is_read = true;
    } else if (is_read === "false") {
        combinedFilter.is_read = false;
    }


    const messagesPerPage = 15;
    const currentPage = Math.max(parseInt(page), 1);

    const totalMessages = await Message.countDocuments(combinedFilter);
    const totalPages = Math.ceil(totalMessages / messagesPerPage) || 1;
    const clampedPage = Math.min(currentPage, totalPages);

    const messages = await Message.find(combinedFilter)
        .skip((clampedPage - 1) * messagesPerPage)
        .limit(messagesPerPage)
        .sort({ updatedAt: sortValue });

    return (<My_Message 
                messages={messages} 
                totalPages={totalPages} 
                currentPage={currentPage} />);
};

export default page;
