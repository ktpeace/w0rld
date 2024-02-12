import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import Navbar from "./Navbar";
// import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Zero",
  description: "The global game played in real life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <UserProvider>
      <ThemeProvider>
        <html lang="en" className="dark">
          <body className={inter.className}>
            {/* <Script
              src="https://kit.fontawesome.com/d16bfd47e6.js"
              crossOrigin="anonymous"
            /> */}
            <div className="flex flex-col h-screen">
              <Navbar />
              <main className="flex-grow overflow-auto">{children}</main>
            </div>
          </body>
        </html>
      </ThemeProvider>
    </UserProvider>
  );
}
