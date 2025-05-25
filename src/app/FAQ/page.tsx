import FAQ_MODEL from "@/models/FAQ";
import FAQPage from "@/template/FAQPage";
import { FAQ_Interface } from "@/types/modelTypes";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

// SEO metadata for the FAQs page
export const metadata: Metadata = {
  title: "FAQs | Estatero",
  description:
    "Find answers to commonly asked questions about the Estatero real estate platform, features, services, and user support.",
  keywords: [
    "FAQs",
    "Frequently Asked Questions",
    "Help Center",
    "Support",
    "Estatero",
    "Real Estate Support",
    "User Guide",
    "Platform Assistance"
  ],
  robots: "index, follow",
  openGraph: {
    title: "FAQs | Estatero",
    description:
      "Find answers to frequently asked questions about Estatero's features, services, and platform support.",
    url: "https://estatero.vercel.app/faqs",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Estatero FAQs Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Estatero",
    title: "FAQs | Estatero",
    description:
      "Explore helpful answers and support information related to the Estatero platform and services.",
    images: ["/img/thumbnail.png"],
  },
};

// Enable Incremental Static Regeneration (ISR) with a 7-day revalidation period
export const revalidate = 60 * 60 * 24 * 7; // 7 days in seconds

// Fetch FAQs from the database
async function fetchFAQ(): Promise<FAQ_Interface[]> {
  await connectDB();
  const FAQs = await FAQ_MODEL.find();
  return FAQs;
}

// Render the FAQ page with fetched data
const page = async () => {
  const FAQs = await fetchFAQ();
  return <FAQPage FAQs={FAQs} />;
};

export default page;