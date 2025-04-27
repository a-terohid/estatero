import LoginPage from "@/template/LoginPage";
import { checkSession } from "@/utils/CheckSession";
import { redirect } from "next/navigation";

/**
 * Metadata for the login page, including SEO and social media information.
 */
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

/**
 * Login page component.
 * 
 * - If the user is already authenticated, redirects to the homepage.
 * - Otherwise, renders the login page.
 */
const page = async () => {
    // Check if a session already exists
    const { session } = await checkSession();
    console.log(session);
    
    // If a session exists, redirect to the homepage
    if (session) redirect("/");

    // Render the login page
    return <LoginPage />;
};

export default page;