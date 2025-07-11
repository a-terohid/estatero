import Property from "@/models/Property";
import PropetiesPage from "@/template/property/PropetiesPage";
import { PropertiesSearchParams_interface } from "@/types/StatesTypes";
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
    "Investment Properties",
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

// Helper function
const isPositiveNumber = (val: string | number | undefined) => {
  const num = Number(val);
  return !isNaN(num) && num > 0;
};

const page = async ({ searchParams }: { searchParams: PropertiesSearchParams_interface }) => {
  await connectDB();

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

  const combinedFilter: any = {
    published: true,
  };

  // Location filtering
  if (location?.trim()) {
    const locationRegex = { $regex: location.trim(), $options: "i" };
    combinedFilter.$or = [
      { "Location.unparsedAddress": locationRegex },
      { "Location.country": locationRegex },
      { "Location.state": locationRegex },
      { "Location.city": locationRegex },
    ];
  }

  // Text filters
  if (property_Category?.trim()) combinedFilter.property_Category = property_Category.trim();
  if (property_type?.trim()) combinedFilter.property_type = property_type.trim();
  if (status?.trim()) combinedFilter.status = status.trim();
  if (property_size_unit?.trim()) combinedFilter.property_size_unit = property_size_unit.trim();
  if (year_built?.trim()) combinedFilter.year_built = year_built.trim();

  // Number filters (only if > 0)
  if (isPositiveNumber(bedrooms)) combinedFilter.bedrooms = Number(bedrooms);
  if (isPositiveNumber(bathrooms)) combinedFilter.bathrooms = Number(bathrooms);
  if (isPositiveNumber(parking_spaces)) combinedFilter.parking_spaces = Number(parking_spaces);

  // Price filter
  if (isPositiveNumber(minPrice) || isPositiveNumber(maxPrice)) {
    combinedFilter.price = {};
    if (isPositiveNumber(minPrice)) combinedFilter.price.$gte = Number(minPrice);
    if (isPositiveNumber(maxPrice)) combinedFilter.price.$lte = Number(maxPrice);
  }

  // Area filter
  if (isPositiveNumber(minArea) || isPositiveNumber(maxArea)) {
    combinedFilter.area = {};
    if (isPositiveNumber(minArea)) combinedFilter.area.$gte = Number(minArea);
    if (isPositiveNumber(maxArea)) combinedFilter.area.$lte = Number(maxArea);
  }

  // Tags filter
  if (tags && tags.length > 0) {
    combinedFilter.tags = { $in: Array.isArray(tags) ? tags : [tags] };
  }

  // Pagination
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
    <PropetiesPage
      Properties={Properties}
      totalproperties={totalproperties}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

export default page;