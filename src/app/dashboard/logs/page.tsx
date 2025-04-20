import { LogsActionFilters } from "@/constants/LogsActionFilterType";
import Log from "@/models/log";
import LogsDashboradPage from "@/template/Dashborad/LogsDashboradPage";
import { LogsPageSearchParams_interface } from "@/types/StatesTypes";
import connectDB from "@/utils/connectDB";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs | Heyat Saghai Abbasieh Jolan",
  description:
    "View and monitor user activity logs and system events within the Estatero real estate admin dashboard.",
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
  // Connect to the database
  await connectDB();

  // Destructure query parameters
  const { page, sort, action, startDate, endDate } = searchParams;

  // Determine sorting order: 1 for ascending, -1 for descending
  const sortValue = sort === "asc" ? 1 : -1;

  // Find the filter associated with the selected action (if any)
  const actionFilter = LogsActionFilters.find((item) => item.value === action)?.filter || {};

  // Build the date filter if both startDate and endDate are provided
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

  // Combine all filters into one object
  const combinedFilter = {
    ...actionFilter,
    ...dateFilter,
  };

  const LogsPerPage = 15;

  // Parse the page number from the query or default to 1
  const Page = parseInt(page || "1");

  // Count total logs matching the filters
  const totalLogs = await Log.countDocuments(combinedFilter);

  // Calculate total pages and clamp current page within valid range
  const totalPages = Math.ceil(totalLogs / LogsPerPage) || 1;
  const currentPage = Math.min(Math.max(Page, 1), totalPages);

  // Fetch logs from the database based on filters, pagination, and sorting
  const Logs = await Log.find({ ...actionFilter, ...dateFilter })
    .skip((currentPage - 1) * LogsPerPage)
    .limit(LogsPerPage)
    .sort({ updatedAt: sortValue });

  // Return the logs dashboard page component with the fetched data
  return (
    <LogsDashboradPage
      logs={Logs}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

export default page;