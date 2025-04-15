import Log from "@/models/log";
import LogsDashboradPage from "@/template/Dashborad/LogsDashboradPage";
import connectDB from "@/utils/connectDB";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs | Heyat Saghai Abbasieh Jolan",
  description:
    "View and monitor user activity logs and system events within the admin panel of Heyat Saghai Abbasieh Jolan.",
  keywords: [
    "User Logs",
    "Admin Dashboard",
    "Heyat Saghai Abbasieh Jolan",
    "System Activity",
    "Audit Logs",
    "Monitoring",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Logs | Heyat Saghai Abbasieh Jolan",
    description:
      "View and monitor user activity logs and system events within the admin panel of Heyat Saghai Abbasieh Jolan.",
    url: "https://estatero.vercel.app/dashboard/logs",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Admin Logs Page - Heyat Saghai Abbasieh Jolan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Estatero",
    title: "Logs | Heyat Saghai Abbasieh Jolan",
    description:
      "View and monitor user activity logs and system events within the admin panel of Heyat Saghai Abbasieh Jolan.",
    images: ["/img/thumbnail.png"],
  },
};
const page = async ({ searchParams }: { searchParams: { page?: string } }) => {

    await connectDB();

    const LogsPerPage = 15;
    const page = parseInt(searchParams.page || "1");
    const totalLogs = await Log.countDocuments();
    const totalPages = Math.ceil(totalLogs / LogsPerPage);

    const currentPage = page > totalPages ? totalPages : page;


    const Logs = await Log.find()
        .skip((currentPage - 1) * LogsPerPage)
        .limit(LogsPerPage)
        


    return ( <LogsDashboradPage logs={Logs} totalPages={totalPages} currentPage={currentPage} /> );
};

export default page;