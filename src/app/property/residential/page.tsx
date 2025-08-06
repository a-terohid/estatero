import Property from "@/models/Property";
import PropetiesPage from "@/template/property/PropetiesPage";
import { PropertiesSearchParams_interface } from "@/types/StatesTypes";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Residential Properties | Estatero",
  description:
    "Explore the latest residential properties on Estatero, including houses, apartments, and villas. Find your perfect home or next real estate investment today.",
  keywords: [
    "Residential Properties",
    "Homes for Sale",
    "Apartments",
    "Houses",
    "Villas",
    "Estatero",
    "Real Estate",
    "Buy Property",
    "Investment Properties",
    "Property Listings",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Residential Properties | Estatero",
    description:
      "Explore the latest residential properties on Estatero, including houses, apartments, and villas. Find your perfect home or next real estate investment today.",
    url: "https://estatero.vercel.app/properties/residential",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Estatero Residential Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Estatero",
    title: "Residential Properties | Estatero",
    description:
      "Explore the latest residential properties on Estatero, including houses, apartments, and villas. Find your perfect home or next real estate investment today.",
    images: ["/img/thumbnail.png"],
  },
};


const page = async ({ searchParams }: { searchParams: PropertiesSearchParams_interface }) => {
  await connectDB();

  const {
    page = "1",
  } = searchParams;

  const filter = {
    property_type: { $regex: "Residential", $options: "i" }, // "i" for case-insensitive
};


  // Pagination
  const PropertiesPerPage = 15;
  const currentPage = Math.max(parseInt(page), 1);
  const totalproperties = await Property.countDocuments(filter);
  const totalPages = Math.ceil(totalproperties / PropertiesPerPage) || 1;
  const clampedPage = Math.min(currentPage, totalPages);

  const Properties = await Property.find(filter)
    .skip((clampedPage - 1) * PropertiesPerPage)
    .limit(PropertiesPerPage)
    .sort({ createdAt: -1 });

  return (
    <PropetiesPage
      Properties={Properties}
      totalproperties={totalproperties}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

export default page;