import { FONTS } from "@/constants/font";
import "./globals.css";
import HomeLayout from "@/layout/HomeLayout";
import NextAuthProvider from "@/providers/NextAuthProvider";
import connectDB from "@/utils/connectDB";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>)
{   
  await connectDB();
  const session = await getServerSession( authOptions )

  return (
    <html lang="en" className={FONTS}>
      <body>
        <NextAuthProvider>
          <HomeLayout role={session ? session?.user.role : null} >
            { children }
          </HomeLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}