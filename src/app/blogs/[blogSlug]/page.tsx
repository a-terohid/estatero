import Agent from "@/models/agent";
import Blog from "@/models/Blog";
import BlogTestimonials from "@/models/Blogtestimonials";
import User from "@/models/user";
import BlogDetailspage from "@/template/blog/BlogDetailspage";
import { Blog_Interface } from "@/types/modelTypes";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import slugify from "slugify";

// Helper to fetch a blog by ID
async function fetchBlogById(blogid: string): Promise<Blog_Interface | null> {
  await connectDB();
  return await Blog.findById(blogid);
}

// Metadata generator
export async function generateMetadata({ params }: { params: { blogSlug: string } }): Promise<Metadata> {
  const mongoId = params.blogSlug.split("-")[0];
  const blog = await fetchBlogById(mongoId);

  if (!blog) {
    return {
      title: "Blog Not Found | Estatero",
      description: "The requested blog post was not found.",
    };
  }

  return {
    title: `${blog.title} | Estatero`,
    description: blog.description.slice(0, 160),
    keywords: [
      blog.title,
      "Real Estate Blog",
      "Property Tips",
      "Market Insights",
      "Estatero Blog",
    ],
    openGraph: {
      title: blog.title,
      description: blog.description.slice(0, 160),
      url: `https://estatero.vercel.app/blog/${params.blogSlug}`,
      type: "article",
      images: [
        {
          url: blog.thumbnails || blog.images?.[0] || "/img/blog-thumbnail.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description.slice(0, 160),
      images: [blog.thumbnails || blog.images?.[0] || "/img/blog-thumbnail.png"],
    },
  };
}

// Static params for blog pages
export async function generateStaticParams() {
  await connectDB();
  const blogs: Blog_Interface[] = await Blog.find();

  const params = await Promise.all(
    blogs.map(async (blog) => {
      const autor =
        (await User.findOne({ _id: blog.autor_id })) ||
        (await Agent.findOne({ _id: blog.autor_id }));

      const autorName = autor ? `${autor.name}${autor.last_name || ""}` : "unknown";

      const slug = slugify(`${blog._id}-${blog.title}-${autorName}`, {
        lower: true,
        strict: true,
      });

      return { blogSlug: slug };
    })
  );

  return params;
}

// Blog Page Component
const page = async ({ params }: { params: { blogSlug: string } }) => {
  const mongoId = params.blogSlug.split("-")[0];
  const BLOG = await fetchBlogById(mongoId);

  const blogs = await Blog.find()
  const otherBLog = blogs.filter(block => block.id !== mongoId);
  const shuffled = otherBLog.sort(() => 0.5 - Math.random());

  if (!BLOG) redirect("/blogs")

  const autor =
    (await User.findOne({ _id: BLOG.autor_id })) ||
    (await Agent.findOne({ _id: BLOG.autor_id }));

  const otherBlogsWithAuthors = await Promise.all(
    shuffled.slice(0, 3).map(async (blog) => {
      const author =
        (await User.findOne({ _id: blog.autor_id })) ||
        (await Agent.findOne({ _id: blog.autor_id }));

      return {
        blog,
        author,
      };
    })
  );

  const BLogTestimonials = await BlogTestimonials.find({blog_id : mongoId})
  const Testimonials = await Promise.all(
    (await BLogTestimonials).map(async (ts)=>{
      const user =
        (await User.findOne({ _id: ts.user_id })) ||
        (await Agent.findOne({ _id: ts.user_id }));

      return {
        Testimonial : ts,
        user,
      };
    })
  )

  return ( <BlogDetailspage 
                blog={BLOG} 
                author={autor} 
                otherBlogs={otherBlogsWithAuthors}  
                Testimonials={Testimonials}/>);
};

export default page;