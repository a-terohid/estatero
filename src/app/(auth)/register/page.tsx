import { authOptions } from '@/lib/auth';
import RegisterPage from '@/template/RegisterPage';
import { checkSession } from '@/utils/CheckSession';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

// Metadata for SEO and social sharing
export const metadata = {
    title: "Register | Estatero - Create Your Account",
    description:
      "Sign up for Estatero to buy, sell, and rent properties effortlessly. Join now and start your real estate journey with us.",
    keywords: [
      "register Estatero",
      "sign up real estate",
      "create account Estatero",
      "real estate platform",
      "buy and sell properties",
      "rent apartments",
    ],
    openGraph: {
      title: "Register | Estatero - Create Your Account",
      description:
        "Sign up for Estatero to buy, sell, and rent properties effortlessly. Join now and start your real estate journey with us.",
      url: "https://estatero.vercel.app/register",
      type: "website",
      images: [
        {
          url: "/img/thumbnail.png",
          height: 630,
          alt: "Register on Estatero - Buy, Sell, and Rent Properties",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Register | Estatero - Create Your Account",
      description:
        "Sign up for Estatero to buy, sell, and rent properties effortlessly. Join now and start your real estate journey with us.",
      images: ["/img/thumbnail.png"],
    },
};

// Page component to handle registration
const page = async () => {

  // Check if the user already has an active session
  const { session } = await checkSession();
  console.log(session);
  
  // If a session exists, redirect to the homepage
  if (session) redirect("/");

  // Otherwise, render the Register page
  return (<RegisterPage />);
};

export default page;