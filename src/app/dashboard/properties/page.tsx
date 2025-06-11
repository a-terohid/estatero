// Importing necessary modules, models, components, and types
import { DashboardItems } from "@/constants/DashboardItems";
import Agent from "@/models/agent";
import Property from "@/models/Property";
import DashboardProperties from "@/template/Dashborad/DashboardProperties";
import { UserRole } from "@/types/enums/generalEnums";
import { PropertiesDashboardSearchParams_interface } from "@/types/StatesTypes";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// Metadata for SEO and social media sharing
export const metadata: Metadata = {
  title: "Properties | Dashboard",
  description:
    "View and manage all your listed real estate properties in one place. Edit, update, or remove property listings directly from your dashboard.",
  keywords: [
    "Property List",
    "Dashboard Properties",
    "Real Estate Management",
    "Manage Properties",
    "Property Dashboard",
    "Real Estate Listings",
    "View Properties",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Properties | Dashboard",
    description:
      "View and manage all your listed real estate properties in one place. Edit, update, or remove property listings directly from your dashboard.",
    url: "https://estatero.vercel.app/dashboard/properties",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Properties Page - Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Properties | Dashboard",
    description:
      "View and manage all your listed real estate properties in one place. Edit, update, or remove property listings directly from your dashboard.",
    images: ["/img/thumbnail.png"],
  },
};

// Async page function that renders the Dashboard Properties page
const page = async ({ searchParams }: { searchParams: PropertiesDashboardSearchParams_interface }) => {
  
  // Connect to the MongoDB database
  await connectDB();

  // Check if the user session is valid and get user info
  const { session, user } = await checkSession();

  // Check if the user has permission to access the Properties dashboard
  const validRoles = DashboardItems.find(item => item.name === "Properties")?.accessibility;
  if (!user || !validRoles?.includes(user.role as UserRole)) redirect("/dashboard/profile");

  // Destructure and provide default values to search parameters
  const { page = "1", sort = "desc", id, agent, status, location, published, property_Category, property_type, text_search } = searchParams;
  const sortValue = sort === "asc" ? 1 : -1;

  // Get all agents from the database
  const agents = await Agent.find();

  // Define the filter object for querying properties
  const combinedFilter: any = {};

  // Filter by property ID
  if (id) {
    combinedFilter._id = id;
  }

  // Filter by category
  if (property_Category) {
    combinedFilter.property_Category = property_Category;
  }

  // Filter by type
  if (property_type) {
    combinedFilter.property_type = property_type;
  }

  // Filter by status
  if (status) {
    combinedFilter.status = status;
  }

  // Filter by location using regex across multiple address fields
  if (location) {
    const locationRegex = { $regex: location, $options: "i" };
    combinedFilter.$or = [
      { "Location.unparsedAddress": locationRegex },
      { "Location.country": locationRegex },
      { "Location.state": locationRegex },
      { "Location.city": locationRegex },
    ];
  }

  // Full-text search on property description
  if (text_search) {
    combinedFilter.description = { $regex: text_search, $options: "i" };
  }

  // Filter by published status
  if (published === "true") {
    combinedFilter.published = true;
  } else if (published === "false") {
    combinedFilter.published = false;
  }

  // Filter by agent name
  if (agent) {
    const agentName = agent.split(" ");
    const nameFilter: any = { name: agentName[0] };
    if (agentName[1]) nameFilter.last_name = agentName[1];

    const target_Agent = await Agent.findOne(nameFilter);
    if (target_Agent) {
      combinedFilter.Agents_id = target_Agent._id;
    }
  }

  // Set pagination settings
  const PropertiesPerPage = 15;
  const currentPage = Math.max(parseInt(page), 1);

  // Get the total number of matching properties
  const totalproperties = await Property.countDocuments(combinedFilter);

  // Calculate total pages and clamp current page within valid range
  const totalPages = Math.ceil(totalproperties / PropertiesPerPage) || 1;
  const clampedPage = Math.min(currentPage, totalPages);

  // Fetch the paginated and sorted list of properties
  const Properties = await Property.find(combinedFilter)
    .skip((clampedPage - 1) * PropertiesPerPage)
    .limit(PropertiesPerPage)
    .sort({ updatedAt: sortValue });

  // Render the DashboardProperties component with data
  return (
    <DashboardProperties 
      agents={agents} 
      Properties={Properties}
      totalproperties={totalproperties}
      totalPages={totalPages}
      currentPage={currentPage} 
    />
  );
};

export default page;