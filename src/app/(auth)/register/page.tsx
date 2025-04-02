import { authOptions } from '@/lib/auth';
import RegisterPage from '@/template/RegisterPage';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

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

const page = async () => {

  await connectDB();
  const session = await getServerSession( authOptions )
  console.log(session);
  
  if ( session ) redirect("/")
    return ( <RegisterPage /> );
};

export default page;