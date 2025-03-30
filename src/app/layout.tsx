"use client"
import type { Metadata } from "next";
import { FONTS } from "@/constants/font";
import "./globals.css";
import HomeLayout from "@/layout/HomeLayout";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={FONTS}>
      <body>
        <HomeLayout>
          { children }
        </HomeLayout>
      </body>
    </html>
  );
}