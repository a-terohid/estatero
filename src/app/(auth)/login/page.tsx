import { authOptions } from "@/lib/auth";
import LoginPage from "@/template/LoginPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Login | Estatero",
    description:
      "Log in to your Estatero account to manage your properties, buy, sell, and rent real estate easily. Secure and hassle-free access to your real estate dashboard.",
    keywords: [
      "Real Estate Login",
      "Estatero Login",
      "Property Management",
      "Buy and Sell Properties",
      "Rent Homes",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Login | Estatero",
      description:
        "Log in to your Estatero account to manage your properties, buy, sell, and rent real estate easily. Secure and hassle-free access to your real estate dashboard.",
      url: "https://estatero.vercel.app/login",
      type: "website",
      images: [
        {
          url: "/img/thumbnail.png", 
          width: 1200,
          height: 630,
          alt: "Estatero Login Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Estatero",
      title: "Login | Estatero",
      description:
        "Log in to your Estatero account to manage your properties, buy, sell, and rent real estate easily. Secure and hassle-free access to your real estate dashboard.",
      image: ["/img/thumbnail.png"],
    },
  };

const page  = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    console.log(session);
    
    if ( session ) redirect("/")

    return (<LoginPage /> );
};

export default page;