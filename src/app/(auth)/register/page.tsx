import RegisterPage from '@/template/RegisterPage';

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
      url: "https://estatero.com/register",
      type: "website",
      images: [
        {
          url: "/thumbnail.png", // You can create a custom image for the register page
          width: 1200,
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
      images: ["/thumbnail.png"],
    },
  };

const page = () => {
    return ( <RegisterPage /> );
};

export default page;