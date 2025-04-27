import { authOptions } from '@/lib/auth';
import User from '@/models/user';
import DashboardProfilePage from '@/template/Dashborad/DashboardProfilePage';
import { checkSession } from '@/utils/CheckSession';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

// Metadata for SEO and social sharing
export const metadata: Metadata = {
    title: "Profile | Estatero",
    description:
      "View and manage your Estatero profile, including email, name, phone number, and account settings. Keep your information up to date for a smoother real estate experience.",
    keywords: [
      "Estatero Profile",
      "User Dashboard",
      "Real Estate Account",
      "Profile Management",
      "Edit User Info",
      "Account Settings",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Profile | Estatero",
      description:
        "View and manage your Estatero profile, including email, name, phone number, and account settings. Keep your information up to date for a smoother real estate experience.",
      url: "https://estatero.vercel.app/dashboard/profile",
      type: "website",
      images: [
        {
          url: "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: "Estatero Profile Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Estatero",
      title: "Profile | Estatero",
      description:
        "View and manage your Estatero profile, including email, name, phone number, and account settings. Keep your information up to date for a smoother real estate experience.",
      images: ["/img/thumbnail.png"],
    },
};

// Page component to render the profile page
const page = async () => {

    // Check session to retrieve the user information
    const { user } = await checkSession();

    // If no user session is found, show a message
    if (!user) {
      return (
        <div className='px-5 py-5'>
          <p className='text-Heading-4 pb-3 border border-primary-100'>User not Found!</p>
        </div>
      );
    }
    
    // Render the Dashboard Profile Page with the user data
    return (<DashboardProfilePage user={user} />);
};

export default page;