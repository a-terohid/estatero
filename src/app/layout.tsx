"use client"
import type { Metadata } from "next";
import { FONTS } from "@/utils/font";
import "./globals.css";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={FONTS}>
      <body>
        { children }
      </body>
    </html>
  );
}