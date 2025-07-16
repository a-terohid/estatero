import Property from '@/models/Property';
import LikedPropertiesDashboardpage from '@/template/Dashborad/LikedPropertiesDashboardpage';
import { Property_Interface } from '@/types/modelTypes';
import { checkSession } from '@/utils/CheckSession';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Liked Listings | Dashboard",
  description:
    "View and manage your liked property listings in the user dashboard. Easily revisit and compare your saved favorites.",
  keywords: [
    "Liked Listings",
    "Saved Properties",
    "User Dashboard",
    "Favorite Listings",
    "Property Comparison",
    "Real Estate Dashboard",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Liked Listings | Dashboard",
    description:
      "View and manage your liked property listings in the user dashboard. Easily revisit and compare your saved favorites.",
    url: "https://yourdomain.com/dashboard/liked-listings",
    type: "website",
    images: [
      {
        url: "/img/liked-listings-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Liked Listings Page - User Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Liked Listings | Dashboard",
    description:
      "View and manage your liked property listings in the user dashboard. Easily revisit and compare your saved favorites.",
    images: ["/img/liked-listings-thumbnail.png"],
  },
};

const page = async () => {

    const { session , user } = await checkSession();

    if (!user) return 

    if (!user || !user.liked_listings || user.liked_listings.length === 0) {
        return <LikedPropertiesDashboardpage properties={[]} />;
    }

    const likedPropertyIds = user.liked_listings;

    const likedProperties: Property_Interface[] = await Property.find({
        _id: { $in: likedPropertyIds },
    });

    return <LikedPropertiesDashboardpage properties={likedProperties} />;

};

export default page;