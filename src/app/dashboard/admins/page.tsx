import User from '@/models/user';
import Agent from '@/models/agent';
import { UserRole } from '@/types/enums/generalEnums';
import { UsersPageSearchParams_interface } from '@/types/StatesTypes';
import { checkSession } from '@/utils/CheckSession';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';
import AdminsDashboardPage from '@/template/Dashborad/AdminsDashboardPage';

// SEO metadata
export const metadata: Metadata = {
  title: "Admins | Estatero Admin Panel",
  description: "Manage platform admins, assign roles, and monitor admins activity within the Estatero real estate admin dashboard.",
  keywords: ["Admins", "Admins Management", "Estatero", "Admin Dashboard", "CRM"],
  robots: "index, follow",
  openGraph: {
	title: "Admins | Estatero Admin Panel",
	description: "Manage platform Admins, assign roles, and monitor user activity within the Estatero admin dashboard.",
	url: "https://estatero.vercel.app/dashboard/admins",
	type: "website",
	images: [{ url: "/img/thumbnail.png", width: 1200, height: 630, alt: "Estatero Admins Page" }],
  },
  twitter: {
	card: "summary_large_image",
	site: "@Estatero",
	title: "Admins | Estatero Admin Panel",
	description: "Manage platform admins, assign roles, and monitor admins activity.",
	images: ["/img/thumbnail.png"],
  },
};

const page = async ({ searchParams }: { searchParams: UsersPageSearchParams_interface }) => {
  await connectDB();
  const { session, user } = await checkSession();

  const validRoles = [UserRole.OWNER, UserRole.AGENTOWNER];
  if (!user || !validRoles.includes(user.role as UserRole)) {
    redirect("/dashboard/profile");
  }

  const { page, sort, email, fullName } = searchParams;
  const sortValue = sort === "asc" ? 1 : -1;

  // Step 1: Get users with role ADMIN
  const adminUsers = await User.find({ role: UserRole.ADMIN });

  // Step 2: Get agents with role AGENTADMIN
  const agentAdmins = await Agent.find({ role: UserRole.AGENTADMIN });


  // Step 4: Merge both lists
  let allAdmins = [...adminUsers, ...agentAdmins];

  // Step 5: Apply search filters on the combined list
  if (email) {
	allAdmins = allAdmins.filter(user => user.email?.toLowerCase().includes(email.toLowerCase()));
  }

  if (fullName) {
	const regex = new RegExp(fullName, "i");
	allAdmins = allAdmins.filter(user =>
	  regex.test(user.name || "") ||
	  regex.test(user.last_name || "") ||
	  regex.test(`${user.name} ${user.last_name}`)
	);
  }

  // Step 6: Pagination
  const LogsPerPage = 15;
  const Page = parseInt(page || "1");
  const totalUsers = allAdmins.length;
  const totalPages = Math.ceil(totalUsers / LogsPerPage) || 1;
  const currentPage = Math.min(Math.max(Page, 1), totalPages);

  const paginatedUsers = allAdmins
	.sort((a, b) => {
	  const aDate = new Date(a.updatedAt).getTime();
	  const bDate = new Date(b.updatedAt).getTime();
	  return sortValue === 1 ? aDate - bDate : bDate - aDate;
	})
	.slice((currentPage - 1) * LogsPerPage, currentPage * LogsPerPage);


  return ( <AdminsDashboardPage 
				users={paginatedUsers}
				totalPages={totalPages}
				currentPage={currentPage}
			/>);
};

export default page;