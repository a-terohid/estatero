import { DashboardItems } from "@/constants/DashboardItems";
import AddPropretyPage from "@/template/Dashborad/AddPropretyPage";
import { UserRole } from "@/types/enums/generalEnums";
import { checkSession } from "@/utils/CheckSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add New Property | Dashboard",
  description:
    "Easily add new real estate properties to your listings. Fill in details, upload images, and manage your properties through the dashboard.",
  keywords: [
    "Add Property",
    "Real Estate Dashboard",
    "Property Management",
    "Upload Property Images",
    "New Property Listing",
    "Real Estate Agent",
    "Property Upload Form",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Add New Property | Dashboard",
    description:
      "Easily add new real estate properties to your listings. Fill in details, upload images, and manage your properties through the dashboard.",
    url: "https://estatero.vercel.app//dashboard/properties/add",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Add Property Page - Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Add New Property | Dashboard",
    description:
      "Easily add new real estate properties to your listings. Fill in details, upload images, and manage your properties through the dashboard.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async () => {

  const { session , user } = await checkSession();
      
  const validRoles = DashboardItems.find(item => item.name === "Properties")?.children[0]?.accessibility;
  if (!user || !validRoles?.includes(user.role as UserRole)) redirect("/dashboard/profile");

  return ( <AddPropretyPage/>);
};

export default page;