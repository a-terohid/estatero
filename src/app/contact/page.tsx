import ContacPage from "@/template/ContacPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Estatero",
  description:
    "Get in touch with the Estatero team for inquiries, support, or feedback. We're here to help with anything related to real estate services.",
  keywords: [
    "Contact",
    "Get in Touch",
    "Support",
    "Customer Service",
    "Estatero",
    "Real Estate Help",
    "Contact Estatero",
    "Reach Out",
    "Real Estate Assistance"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Contact Us | Estatero",
    description:
      "Have questions or need assistance? Contact the Estatero team for real estate support and inquiries.",
    url: "https://estatero.vercel.app/contact",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Contact Estatero Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Estatero",
    title: "Contact Us | Estatero",
    description:
      "Reach out to Estatero for support, inquiries, or feedback related to our real estate platform.",
    images: ["/img/thumbnail.png"],
  },
};

const page = () => {
    return (<ContacPage />);
};

export default page;