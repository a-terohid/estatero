import Agent from "@/models/agent";
import Blog from "@/models/Blog";
import User from "@/models/user";
import BlogdetailsDashboard from "@/template/Dashborad/BlogdetailsDashboard";
import { Agent_Interface, Blog_Interface, User_Interface } from "@/types/modelTypes";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";


export async function generateMetadata({ params: { blogID } }: { params: { blogID: string } }): Promise<Metadata> {
  await connectDB();

  const blog = await Blog.findById(blogID);

  if (!blog) {
    return {
      title: "Blog Not Found | Dashboard",
      description: "The requested blog could not be found in the dashboard.",
    };
  }

  const title = blog.title || "Untitled Blog";
  const description = blog.description || "No description available.";
  const image = blog.thumbnails || "/img/default-blog-thumbnail.png";

  return {
    title: `${title} | Blog Details`,
    description: description,
    keywords: [
      title,
      "Blog Post",
      "Dashboard Blog",
      "Blog Management",
      "Content",
    ],
    robots: "noindex, nofollow",
    openGraph: {
      title: `${title} | Blog Details`,
      description: description,
      url: `https://yourdomain.com/dashboard/blogs/${blog._id}`,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Thumbnail for ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@YourHandle",
      title: `${title} | Blog Details`,
      description: description,
      images: [image],
    },
  };
}

const page = async ({ params: { blogID } }: { params: { blogID: string } }) => {

    // Connect to MongoDB
    await connectDB();

    const { session, user } = await checkSession();

    // Find the property by ID from the database
    const blog = await Blog.findById(blogID);

    if (!user) return

    const author : User_Interface | Agent_Interface | null = await User.findOne({ _id: blog?.autor_id }) || await Agent.findOne({ _id: blog?.autor_id });
    

    if(!blog) return(<div className="p-4">
        <h1>Blog Not Found</h1>
    </div>)


    return ( <BlogdetailsDashboard blog={blog} author={author} /> );
};

export default page;