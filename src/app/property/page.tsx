import Property from "@/models/Property";
import { PropertiesDashboardSearchParams_interface, PropertiesSearchParams_interface } from "@/types/StatesTypes";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties | Estatero",
  description:
    "Discover a wide range of real estate listings on Estatero. Browse available properties, compare features, and find your next home or investment opportunity.",
  keywords: [
    "Properties",
    "Real Estate Listings",
    "Homes for Sale",
    "Estatero",
    "Buy Property",
    "Apartments",
    "Houses",
    "Investment Properties"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Properties | Estatero",
    description:
      "Discover a wide range of real estate listings on Estatero. Browse available properties, compare features, and find your next home or investment opportunity.",
    url: "https://estatero.vercel.app/properties",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Estatero Properties Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Estatero",
    title: "Properties | Estatero",
    description:
      "Discover a wide range of real estate listings on Estatero. Browse available properties, compare features, and find your next home or investment opportunity.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async ({ searchParams }: { searchParams: PropertiesSearchParams_interface }) => {

    await connectDB();

    // Destructure and provide default values to search parameters
   

  const {
    page = "1",
    sort = "desc",
    status,
    location,
    property_Category,
    property_type,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    property_size_unit,
    bedrooms,
    bathrooms,
    parking_spaces,
    year_built,
    tags,
  } = searchParams;

  const sortValue = sort === "asc" ? 1 : -1;
  const combinedFilter: any = {};

  // Location filtering with regex
  if (location) {
    const locationRegex = { $regex: location, $options: "i" };
    combinedFilter.$or = [
      { "Location.unparsedAddress": locationRegex },
      { "Location.country": locationRegex },
      { "Location.state": locationRegex },
      { "Location.city": locationRegex },
    ];
  }

  // Simple equality filters
  if (property_Category) combinedFilter.property_Category = property_Category;
  if (property_type) combinedFilter.property_type = property_type;
  if (status) combinedFilter.status = status;
  if (property_size_unit) combinedFilter.property_size_unit = property_size_unit;
  if (year_built) combinedFilter.year_built = year_built;
  if (bedrooms) combinedFilter.bedrooms = Number(bedrooms);
  if (bathrooms) combinedFilter.bathrooms = Number(bathrooms);
  if (parking_spaces) combinedFilter.parking_spaces = Number(parking_spaces);

  // Price filter as range
  if (minPrice || maxPrice) {
    combinedFilter.price = {};
    if (minPrice) combinedFilter.price.$gte = Number(minPrice);
    if (maxPrice) combinedFilter.price.$lte = Number(maxPrice);
  }

  // Area filter as range
  if (minArea || maxArea) {
    combinedFilter.area = {};
    if (minArea) combinedFilter.area.$gte = Number(minArea);
    if (maxArea) combinedFilter.area.$lte = Number(maxArea);
  }

  // Tags filter (if you want to match at least one tag)
  if (tags) {
    combinedFilter.tags = { $in: Array.isArray(tags) ? tags : [tags] };
  }

  // Pagination logic
  const PropertiesPerPage = 15;
  const currentPage = Math.max(parseInt(page), 1);
  const totalproperties = await Property.countDocuments(combinedFilter);
  const totalPages = Math.ceil(totalproperties / PropertiesPerPage) || 1;
  const clampedPage = Math.min(currentPage, totalPages);

  const Properties = await Property.find(combinedFilter)
    .skip((clampedPage - 1) * PropertiesPerPage)
    .limit(PropertiesPerPage)
    .sort({ createdAt: sortValue });

    
    return (
        <div>
            
        </div>
    );
};

export default page;