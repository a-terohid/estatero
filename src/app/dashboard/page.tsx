import Blog from '@/models/Blog';
import Form from '@/models/form';
import Message from '@/models/message';
import Property from '@/models/Property';
import DashboardPage from '@/template/Dashborad/DashboardPage';
import { checkSession } from '@/utils/CheckSession';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Dashboard | Estatero",
  description:
    "Access and manage your real estate listings, messages, blogs, and forms all in one place. Designed for property owners and administrators.",
  keywords: [
    "Real Estate Dashboard",
    "Manage Properties",
    "Owner Panel",
    "User Dashboard",
    "Messages",
    "Forms",
    "Blogs",
    "Property Management",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Dashboard | Estatero",
    description:
      "Control your real estate operations with Estatero's all-in-one dashboard. Review properties, blogs, messages, and forms efficiently.",
    url: "https://yourdomain.com/dashboard",
    type: "website",
    images: [
      {
        url: "/img/dashboard-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "User Dashboard - Estatero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@EstateroApp",
    title: "Dashboard | Estatero",
    description:
      "Manage your listings, messages, forms, and more on Estatero's centralized dashboard for real estate professionals.",
    images: ["/img/dashboard-thumbnail.png"],
  },
};

const page = async () => {

    const { session , user } = await checkSession();

    const RoleConditions = {
        isOwner : false,
        isAdmin : false,
        isAgent : false
    }

    const notifications : any = {}

    if( user?.role.includes("Owner") ) RoleConditions.isOwner = true
    if( user?.role.includes("Admin") ) RoleConditions.isAdmin = true
    if( user?.role.includes("Agent") ) RoleConditions.isAgent = true

    if( RoleConditions.isAgent ) {
        const unread_messages = await Message.countDocuments({is_read : false , receiver_id: user?._id})

        notifications.myMessages = unread_messages
    }

    if (RoleConditions.isAdmin || RoleConditions.isOwner) {
        const unread_form = await Form.countDocuments({ is_read: false });
        const unpublished_properties = await Property.countDocuments({ published: false });
        const unpublished_blogs = await Blog.countDocuments({ published: false });

        notifications.unPublishedProperties = unpublished_properties;
        notifications.unPublishedBlog = unpublished_blogs;
        notifications.forms = unread_form;
    }

    if (RoleConditions.isOwner) {
        const unread_messages = await Message.countDocuments({ is_read: false });
        notifications.allMessages = unread_messages;
    }

    return (
        <DashboardPage notifications={notifications} RoleConditions={RoleConditions} />
    );
};

export default page;