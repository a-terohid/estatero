"use client"
import type { Metadata } from "next";
import { FONTS } from "@/constants/font";
import "./globals.css";
import HomeLayout from "@/layout/HomeLayout";
import NextAuthProvider from "@/providers/NextAuthProvider";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={FONTS}>
      <body>
        <NextAuthProvider>
          <HomeLayout>
            { children }
          </HomeLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}