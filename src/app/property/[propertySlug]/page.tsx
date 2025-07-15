import Property from "@/models/Property";
import { Agent_Interface, Property_Interface } from "@/types/modelTypes";
import connectDB from "@/utils/connectDB";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import slugify from "slugify";
import PropertDetail from "@/template/property/PropertDetail";
import Agent from "@/models/agent";

// Fetch function
async function fetchPropertyById(propertyId: string): Promise<Property_Interface | null> {
  await connectDB();
  const property = await Property.findById(propertyId);
  return property;
}

// Static metadata generator
export async function generateMetadata({ params }: { params: { propertySlug: string } }): Promise<Metadata> {
  const mongoId = params.propertySlug.split("-")[0];

  const property = await fetchPropertyById(mongoId);

  if (!property) {
    return {
      title: "Property Not Found | Estatero",
      description: "The requested property was not found.",
    };
  }

  return {
    title: `${property.title} | Estatero`,
    description: `${property.bedrooms} beds · ${property.bathrooms} baths · ${property.area} ${property.property_size_unit} · ${property.Location?.unparsedAddress || ""}`,
    keywords: [
      property.title,
      "Real Estate",
      "Property Listing",
      property.property_type,
      property.property_Category,
      "Estatero",
    ],
    openGraph: {
      title: property.title,
      description: `${property.bedrooms} beds · ${property.bathrooms} baths · ${property.area} ${property.property_size_unit}`,
      url: `https://estatero.vercel.app/property/${params.propertySlug}`,
      type: "article",
      images: [
        {
          url: property.thumbnail || "/img/thumbnail.png",
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: `${property.bedrooms} beds · ${property.bathrooms} baths · ${property.area} ${property.property_size_unit}`,
      images: [property.thumbnail || "/img/thumbnail.png"],
    },
  };
}

// Static paths for build time
export async function generateStaticParams() {
  await connectDB();
  const properties = await Property.find({}, "_id title Location bedrooms bathrooms property_type area property_size_unit");

  return properties.map((p) => {
    const slug = slugify(
      `${p._id}-${p.title}-${p.Location?.unparsedAddress || ""}-${p.bedrooms}bedrooms-${p.bathrooms}bathrooms-${p.property_type}-${p.area}${p.property_size_unit}`,
      { lower: true, strict: true }
    );
    return { propertySlug: slug };
  });
}

// Page Component
const page = async ({ params }: { params: { propertySlug: string } }) => {
  const fullSlug = params.propertySlug;
  const mongoId = fullSlug.split("-")[0];

  const property = await fetchPropertyById(mongoId);

  const agents: Agent_Interface[] = await Agent.find({ _id: { $in: property?.Agents_id } });


  if (!property) return notFound();

  return (<PropertDetail property={property} agents={agents} />);
};

export default page;