import { FONTS } from "@/constants/font";
import "./globals.css";
import HomeLayout from "@/layout/HomeLayout";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { checkSession } from "@/utils/CheckSession";


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>)
{   
  const { session } = await checkSession();

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