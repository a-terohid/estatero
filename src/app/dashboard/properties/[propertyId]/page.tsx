import { Metadata } from "next";
import Property from "@/models/Property";
import connectDB from "@/utils/connectDB";
import { Property_Interface } from "@/types/modelTypes";

export async function generateMetadata(
  { params: { propertyId } }: { params: { propertyId: string } }
): Promise<Metadata> {
  // Connect to MongoDB
  await connectDB();

  // Find the property by ID from the database
  const property  = await Property.findById(propertyId);

  // If property is not found, return fallback metadata
  if (!property) {
    return {
      title: "Property Not Found | Estatero",
      description: "The specified property could not be found.",
    };
  }

  // Extract property details
  const title = property.title || "Property";
  const location = property.Location.unparsedAddress || "";
  const image = property.thumbnail || "/img/property-default.png";

  return {
    title: `${title} | Estatero`,
    description: `Discover details about "${title}" located in ${location}. View photos, features, and more on Estatero.`,
    keywords: [
      title,
      location,
      "Real Estate",
      "Property Listing",
      "Estatero",
      "Buy Property",
      "Rent Property",
    ],
    robots: "index, follow",
    openGraph: {
      title: `${title} | Estatero`,
      description: `Details and specifications of "${title}" in ${location}.`,
      url: `https://estatero.vercel.app/properties/${property._id}`,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Cover of ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Estatero",
      title: `${title} | Estatero`,
      description: `Discover property "${title}" located in ${location}.`,
      images: [image],
    },
  };
}

const page = () => {
    return (
        <div>
            properties details
        </div>
    );
};

export default page;