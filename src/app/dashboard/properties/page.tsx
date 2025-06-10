import Agent from "@/models/agent";
import DashboardProperties from "@/template/Dashborad/DashboardProperties";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

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

const page = async () => {

    await connectDB()

    const agents = await Agent.find();


    return ( <DashboardProperties agents={agents} /> );
};

export default page;