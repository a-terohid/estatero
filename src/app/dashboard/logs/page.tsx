import { LogsActionFilters } from "@/constants/LogsActionFilterType";
import Log from "@/models/log";
import LogsDashboradPage from "@/template/Dashborad/LogsDashboradPage";
import { LogsPageSearchParams_interface } from "@/types/StatesTypes";
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

const page = async ({ searchParams }: { searchParams: LogsPageSearchParams_interface }) => {
  await connectDB();

  const { page, sort, action, startDate, endDate } = searchParams;

  const sortValue = sort === "asc" ? 1 : -1;
  const actionFilter = LogsActionFilters.find((item) => item.value === action)?.filter || {};

 
  const dateFilter =
  startDate && endDate
    ? {
        $expr: {
          $and: [
            {
              $gte: [
                { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                startDate.slice(0, 10),
              ],
            },
            {
              $lte: [
                { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                endDate.slice(0, 10),
              ],
            },
          ],
        },
      }
    : {};

  const combinedFilter = {
      ...actionFilter,
      ...dateFilter,
  };

  const LogsPerPage = 15;
  
  const Page = parseInt(page || "1");
  const totalLogs = await Log.countDocuments(combinedFilter);
  const totalPages = Math.ceil(totalLogs / LogsPerPage) || 1;
  const currentPage = Math.min(Math.max(Page, 1), totalPages);


  const Logs = await Log.find({ ...actionFilter, ...dateFilter })
    .skip((currentPage - 1) * LogsPerPage)
    .limit(LogsPerPage)
    .sort({ updatedAt: sortValue });

  return (
      <LogsDashboradPage
          logs={Logs}
          totalPages={totalPages}
          currentPage={currentPage}
      />
  );
};

export default page;