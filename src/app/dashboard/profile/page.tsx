import { authOptions } from '@/lib/auth';
import User from '@/models/user';
import DashboardProfilePage from '@/template/Dashborad/DashboardProfilePage';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

export const metadata : Metadata = {
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

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )

    const user = await User.findOne({email : session?.user?.email})
    
    return ( <DashboardProfilePage user={ user }/> );
};

export default page;