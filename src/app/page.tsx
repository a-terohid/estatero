import HomePage from "@/template/HomePage"

export const metadata = {
  title: "Estatero | Buy, Sell, and Rent Properties",
  description:
    "Estatero is a real estate platform for buying, selling, and renting properties. Find your dream home with the best real estate agents.",
  keywords: [
    "real estate",
    "buy property",
    "sell house",
    "rent apartment",
    "real estate agents",
    "property investment",
    "Estatero",
    "online real estate",
  ],
  openGraph: {
    title: "Estatero | Buy, Sell, and Rent Properties",
    description:
      "Estatero is a real estate platform for buying, selling, and renting properties. Find your dream home with the best real estate agents.",
    url: "https://estatero.com",
    type: "website",
    images: [
      {
        url: "/thumbnail.png", // Replace with a suitable OpenGraph image
        width: 1200,
        height: 630,
        alt: "Estatero - Buy, Sell, and Rent Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estatero | Buy, Sell, and Rent Properties",
    description:
      "Estatero is a real estate platform for buying, selling, and renting properties. Find your dream home with the best real estate agents.",
    images: ["/thumbnail.png"],
  },
};

const page = () => {
    return (
      <>
        <HomePage />
      </>
    );
};

export default page;




