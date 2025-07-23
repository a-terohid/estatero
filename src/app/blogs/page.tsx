import Agent from "@/models/agent";
import Blog from "@/models/Blog";
import User from "@/models/user";
import BlogsPage from "@/template/blog/BlogsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Estatero",
  description:
    "Read the latest real estate blogs and industry insights on Estatero. Stay informed with market trends, property tips, and expert advice.",
  keywords: [
    "Real Estate Blogs",
    "Property Tips",
    "Housing Market News",
    "Estatero Blogs",
    "Investment Advice",
    "Real Estate Insights",
    "Property Market",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Blogs | Estatero",
    description:
      "Read the latest real estate blogs and industry insights on Estatero. Stay informed with market trends, property tips, and expert advice.",
    url: "https://estatero.vercel.app/blogs",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Estatero Blogs Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Estatero",
    title: "Blogs | Estatero",
    description:
      "Read the latest real estate blogs and industry insights on Estatero. Stay informed with market trends, property tips, and expert advice.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async ({ searchParams }: { searchParams: {page : string} }) => {

    const { page = "1" } = searchParams;

    // Set pagination settings
    const BlogsPerPage = 15;
    const currentPage = Math.max(parseInt(page), 1);

    // Get the total number of matching properties
    const totalBlogs = await Blog.countDocuments({published: true});

    // Calculate total pages and clamp current page within valid range
    const totalPages = Math.ceil(totalBlogs / BlogsPerPage) || 1;
    const clampedPage = Math.min(currentPage, totalPages);

    // Fetch the paginated and sorted list of properties
    const blogs = await Blog.find({published : true})
    .skip((clampedPage - 1) * BlogsPerPage)
    .limit(BlogsPerPage)
    .sort({ createdAt : -1 });

    const authors_id = await Blog.distinct("autor_id");

    const userAuthors = await User.find({ _id: { $in: authors_id } });
    const agentAuthors = await Agent.find({ _id: { $in: authors_id } });

    const authors = [...userAuthors, ...agentAuthors];

    return (<BlogsPage 
                blogs={blogs} 
                authors={authors} 
                totalBlogs={totalBlogs}
                totalPages={totalPages}
                currentPage={currentPage}  />);
};

export default page;