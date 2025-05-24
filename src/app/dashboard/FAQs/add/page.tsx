import { DashboardItems } from '@/constants/DashboardItems';
import AddFAQPage from '@/template/Dashborad/AddFAQPage';
import { UserRole } from '@/types/enums/generalEnums';
import { checkSession } from '@/utils/CheckSession';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata: Metadata = {
  title: "Add FAQ | Dashboard",
  description: "Create and add new Frequently Asked Questions (FAQs) to help users find answers easily.",
  keywords: [
    "Add FAQ",
    "Create FAQ",
    "User Dashboard",
    "FAQ Management",
    "Support Content",
    "Help Center",
  ],
  robots: "noindex, nofollow",
  openGraph: {
    title: "Add FAQ | Dashboard",
    description: "Create new FAQs for the help center and improve user experience.",
    url: "https://yourdomain.com/dashboard/faqs/add",
    type: "website",
    images: [
      {
        url: "/img/add-faq-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Add FAQ Page - User Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Add FAQ | Dashboard",
    description: "Create new FAQs for the help center and improve user experience.",
    images: ["/img/add-faq-thumbnail.png"],
  },
};

const page = async () => {

    const { session , user } = await checkSession();
      
    const validRoles = DashboardItems.find(item => item.name === 'FAQs')?.accessibility;
    if (!user || !validRoles?.includes(user.role as UserRole)) {
        redirect("/dashboard/profile");
    }

    return (<AddFAQPage />);
};

export default page;