import { Metadata } from "next";
import Property from "@/models/Property";
import connectDB from "@/utils/connectDB";
import { Property_Interface } from "@/types/modelTypes";
import PropertyDashboardDetails from "@/template/Dashborad/PropertyDashboardDetails";
import Agent from "@/models/agent";
import { checkSession } from "@/utils/CheckSession";
import EditPropertyDashboardPage from "@/template/Dashborad/EditPropertyDashboardPage";


export async function generateMetadata(
  { params: { propertyId } }: { params: { propertyId: string } }
): Promise<Metadata> {
  await connectDB();

  const property = await Property.findById(propertyId);

  if (!property) {
    return {
      title: "Edit Property | Not Found",
      description: "This property does not exist or was removed.",
    };
  }

  const title = property.title || "Untitled Property";
  const location = property.Location?.unparsedAddress || "Unknown location";
  const image = property.thumbnail || "/img/property-default.png";

  return {
    title: `Edit ${title} | Dashboard | Estatero`,
    description: `Edit listing for "${title}" located in ${location}. Update images, features, and pricing information.`,
    keywords: [
      title,
      location,
      "Edit Property",
      "Property Management",
      "Estatero Dashboard",
      "Real Estate Admin",
      "Update Listing",
    ],
    robots: "noindex, nofollow", // because edit pages should not be indexed
    openGraph: {
      title: `Edit ${title} | Estatero Dashboard`,
      description: `Edit and update the listing for "${title}" in ${location}.`,
      url: `https://estatero.vercel.app/dashboard/edit-property/${property._id}`,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Edit view of ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Estatero",
      title: `Edit ${title} | Dashboard`,
      description: `Admin editing: "${title}" in ${location}.`,
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

    // Get all agents from the database
    const agents = await Agent.find();

    if(!property) return(<div>
        <h1>Property Not Found</h1>
    </div>)

    return ( <EditPropertyDashboardPage property={property} agents={agents} />);
};

export default page;