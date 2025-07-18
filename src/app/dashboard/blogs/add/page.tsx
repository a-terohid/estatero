import { DashboardItems } from '@/constants/DashboardItems';
import AddBlogDashboardPage from '@/template/Dashborad/AddBlogDashboardPage';
import { UserRole } from '@/types/enums/generalEnums';
import { checkSession } from '@/utils/CheckSession';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Add New Blog Post | Dashboard",
  description:
    "Create and publish new blog posts effortlessly. Write content, upload images, and manage your blog articles through the dashboard.",
  keywords: [
    "Add Blog Post",
    "Blog Dashboard",
    "Content Management",
    "Write Article",
    "Upload Blog Images",
    "New Blog Entry",
    "Post Editor",
    "Blog Publishing Tool",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Add New Blog Post | Dashboard",
    description:
      "Create and publish new blog posts effortlessly. Write content, upload images, and manage your blog articles through the dashboard.",
    url: "https://yourwebsite.com/dashboard/blogs/add",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Add Blog Post - Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Add New Blog Post | Dashboard",
    description:
      "Create and publish new blog posts effortlessly. Write content, upload images, and manage your blog articles through the dashboard.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async () => {

    const { session , user } = await checkSession();
          
    const validRoles = DashboardItems.find(item => item.name === "Blogs")?.children[0]?.accessibility;
    if (!user || !validRoles?.includes(user.role as UserRole)) redirect("/dashboard/profile");

    return (<AddBlogDashboardPage />);
};

export default page;