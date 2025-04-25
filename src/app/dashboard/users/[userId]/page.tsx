import User from '@/models/user';
import UserDetailDashboard from '@/template/Dashborad/UserDetailDashboard';
import { User_Interface } from '@/types/modelTypes';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

// This function generates dynamic metadata for the page based on the user's data
export async function generateMetadata(
  { params: { userId } }: { params: { userId: string } }
): Promise<Metadata> {
  // Connect to MongoDB
  await connectDB();

  // Find the user by ID
  const user = await User.findById(userId);

  // If user not found, return fallback metadata
  if (!user) {
    return {
      title: "User Not Found | Estatero Admin Panel",
      description: "The specified user could not be found.",
    };
  }

  // Construct full name from available user fields
  const fullName = `${user.name || ''} ${user?.last_name}`;

  // Return metadata populated with user-specific details
  return {
    title: `${fullName} | Estatero Admin Panel`,
    description: `View and manage the profile of ${fullName} on the Estatero real estate admin dashboard.`,
    keywords: [
      "User Profile",
      fullName,
      "Estatero",
      "Real Estate Platform",
      "Admin Dashboard",
      "User Details",
      "CRM",
    ],
    robots: "index, follow",
    openGraph: {
      title: `${fullName} | Estatero Admin Panel`,
      description: `View and manage the profile of ${fullName} on the Estatero real estate admin dashboard.`,
      url: `https://estatero.vercel.app/dashboard/users/${user._id}`,
      type: "profile",
      images: [
        {
          url: user.profile_picture || "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: `Profile of ${fullName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Estatero",
      title: `${fullName} | Estatero Admin Panel`,
      description: `View and manage the profile of ${fullName} on the Estatero real estate admin dashboard.`,
      images: [user.profile_picture || "/img/thumbnail.png"],
    },
  };
}

// This is the main page component
const Page = async ({ params }: { params: { userId: string } }) => {
  // Connect to the database
  await connectDB();

  // Fetch the user by ID
  const user = await User.findById(params.userId);

  // If user not found, show an error message
  if (!user) {
    return (
      <div className="p-4 text-red-600">
        User not found.
      </div>
    );
  }

  // Render the user detail dashboard with the fetched user
  return <UserDetailDashboard user={user} />;
};

export default Page;