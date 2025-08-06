import Property from "@/models/Property";
import PropetiesPage from "@/template/property/PropetiesPage";
import { PropertiesSearchParams_interface } from "@/types/StatesTypes";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Properties | Estatero",
  description:
    "Discover top commercial real estate listings on Estatero. Browse office spaces, retail units, warehouses, and more to grow your business or expand your investments.",
  keywords: [
    "Commercial Properties",
    "Office Spaces",
    "Retail Units",
    "Warehouses",
    "Commercial Real Estate",
    "Estatero",
    "Business Property",
    "Commercial Listings",
    "Invest in Commercial Property",
    "Real Estate for Business",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Commercial Properties | Estatero",
    description:
      "Discover top commercial real estate listings on Estatero. Browse office spaces, retail units, warehouses, and more to grow your business or expand your investments.",
    url: "https://estatero.vercel.app/properties/commercial",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Estatero Commercial Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Estatero",
    title: "Commercial Properties | Estatero",
    description:
      "Discover top commercial real estate listings on Estatero. Browse office spaces, retail units, warehouses, and more to grow your business or expand your investments.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async ({ searchParams }: { searchParams: PropertiesSearchParams_interface }) => {
  await connectDB();

  const {
    page = "1",
  } = searchParams;

  const filter = {
    property_type: { $regex: "Commercial", $options: "i" }, 
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