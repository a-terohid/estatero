import { Metadata } from "next";
import Property from "@/models/Property";
import connectDB from "@/utils/connectDB";
import { Property_Interface } from "@/types/modelTypes";
import PropertyDashboardDetails from "@/template/Dashborad/PropertyDashboardDetails";
import Agent from "@/models/agent";
import { checkSession } from "@/utils/CheckSession";

export async function generateMetadata({ params: { propertyId } }: { params: { propertyId: string } }): Promise<Metadata> {
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

const page = async ({ params: { propertyId } }: { params: { propertyId: string } }) => {

    // Connect to MongoDB
    await connectDB();

    const { session, user } = await checkSession();

    // Find the property by ID from the database
    const property  = await Property.findById(propertyId);

    if (!user) return

    const userIsAdmin = user?.role.includes("Admin") || user?.role.includes("Owner");

    // Get all agents from the database
    const agents = await Agent.find();
    const agent= agents.filter((ag) => property.Agents_id.includes(ag._id || ''))

    if(!property) return(<div>
        <h1>Property Not Found</h1>
    </div>)

    return ( <PropertyDashboardDetails property={property} agent={agent} userIsAdmin={userIsAdmin} />);
};

export default page;