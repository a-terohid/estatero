import AboutUsPage from "@/template/AboutUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Estatero",
  description:
    "Learn more about Estatero — our mission, our team, and how we're reshaping the real estate experience with innovation and integrity.",
  keywords: [
    "About Estatero",
    "Our Mission",
    "Our Team",
    "Real Estate Company",
    "Estatero",
    "Who We Are",
    "Real Estate Innovation",
    "Company Values",
    "Meet the Team"
  ],
  robots: "index, follow",
  openGraph: {
    title: "About Us | Estatero",
    description:
      "Discover the story behind Estatero, our values, and the people driving change in the real estate world.",
    url: "https://estatero.vercel.app/aboutUs",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "About Estatero Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Estatero",
    title: "About Us | Estatero",
    description:
      "Get to know Estatero, the team behind the platform, and our mission to revolutionize real estate.",
    images: ["/img/thumbnail.png"],
  },
};

const page = () => {
    return (<AboutUsPage/> );
};

export default page;