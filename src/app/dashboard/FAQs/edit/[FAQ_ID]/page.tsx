// Import required modules and components
import { DashboardItems } from "@/constants/DashboardItems";
import FAQ_MODEL from "@/models/FAQ";
import EditFAQPage from "@/template/Dashborad/EditFAQPage";
import { UserRole } from "@/types/enums/generalEnums";
import { checkSession } from "@/utils/CheckSession";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Define SEO metadata for the page
export const metadata: Metadata = {
  title: "Edit FAQ | Dashboard",
  description: "Edit an existing Frequently Asked Question (FAQ) in your dashboard. Update the content and manage your FAQ list efficiently.",
  keywords: [
    "Edit FAQ",
    "FAQ Management",
    "Frequently Asked Questions",
    "Dashboard",
    "Help Center",
    "Support",
    "Admin Panel"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Edit FAQ | Dashboard",
    description: "Easily update and manage your existing FAQs through the dashboard.",
    url: "https://estatero.vercel.app/dashboard/FAQs/edit", // Replace with actual domain
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Edit FAQ Page - Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle", // Replace with your actual Twitter handle
    title: "Edit FAQ | Dashboard",
    description: "Easily update and manage your existing FAQs through the dashboard.",
    images: ["/img/thumbnail.png"]
  }
};

// Server-side page component for editing an FAQ
const page = async ({ params }: { params: { FAQ_ID: string } }) => {
  // Check user session and authentication
  const { session, user } = await checkSession();
  
  // Get the list of allowed roles for the FAQs dashboard section
  const validRoles = DashboardItems.find(item => item.name === 'FAQs')?.accessibility;

  // If the user is not authenticated or doesn't have access, redirect to profile page
  if (!user || !validRoles?.includes(user.role as UserRole)) {
    redirect("/dashboard/profile");
  }

  // Fetch the FAQ item by its ID
  const FAQ = await FAQ_MODEL.findById(params.FAQ_ID);

  // If the FAQ doesn't exist, return an error message
  if (!FAQ) {
    return (
      <div className="p-4 text-red-600">
        FAQ not found.
      </div>
    );
  }

  // Render the EditFAQPage component with the fetched FAQ data
  return (<EditFAQPage FAQ={FAQ} />);
};

export default page;