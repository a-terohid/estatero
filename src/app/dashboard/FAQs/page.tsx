// Importing required modules and components
import { DashboardItems } from "@/constants/DashboardItems"; // Dashboard configuration, including access rules
import FAQ_MODEL from "@/models/FAQ"; // Mongoose model for FAQ entries
import FAQsPage from "@/template/Dashborad/FAQsPage"; // Component to render the FAQs list UI
import { UserRole } from "@/types/enums/generalEnums"; // Enum defining possible user roles
import { checkSession } from "@/utils/CheckSession"; // Function to verify user authentication and get session
import { Metadata } from "next"; // Type for Next.js metadata
import { redirect } from "next/navigation"; // Function to programmatically redirect user

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "FAQs | Dashboard",
  description: "View all Frequently Asked Questions (FAQs) in your dashboard. Manage, search, and filter FAQs with ease.",
  keywords: [
    "FAQs",
    "Frequently Asked Questions",
    "User Dashboard",
    "FAQ Management",
    "Help Center",
    "Support",
  ],
  robots: "index, follow",
  openGraph: {
    title: "FAQs | Dashboard",
    description: "Explore and manage all FAQs in your dashboard.",
    url: "https://yourdomain.com/dashboard/faqs", // Replace with actual domain
    type: "website",
    images: [
      {
        url: "/img/faqs-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "FAQs Page - User Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle", // Replace with your Twitter handle
    title: "FAQs | Dashboard",
    description: "Explore and manage all FAQs in your dashboard.",
    images: ["/img/faqs-thumbnail.png"],
  },
};

// Server component/page for the FAQs section of the dashboard
const page = async ({ searchParams }: { searchParams: { page: string } }) => {
  // Check if the user is logged in and get their session and role
  const { session, user } = await checkSession();

  // Extract the page number from search parameters (e.g., ?page=2)
  const { page } = searchParams;

  // Get list of roles allowed to access this page from dashboard config
  const validRoles = DashboardItems.find(item => item.name === 'FAQs')?.accessibility;

  // Redirect if user is not logged in or doesn't have permission
  if (!user || !validRoles?.includes(user.role as UserRole)) {
    redirect("/dashboard/profile");
  }

  // Number of FAQs to show per page
  const FAQPerPage = 15;

  // Convert page number to integer (default to 1 if not provided or invalid)
  const Page = parseInt(page || "1");

  // Get the total number of FAQ documents from the database
  const totallFAQ = await FAQ_MODEL.countDocuments();

  // Calculate total number of pages
  const totalPages = Math.ceil(totallFAQ / FAQPerPage) || 1;

  // Ensure currentPage is within valid bounds
  const currentPage = Math.min(Math.max(Page, 1), totalPages);

  // Fetch FAQs for the current page with pagination
  const FAQs = await FAQ_MODEL.find()
    .skip((currentPage - 1) * FAQPerPage)
    .limit(FAQPerPage);

  // Render the FAQsPage component with fetched data
  return (
    <FAQsPage
      FAQs={FAQs}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

export default page;