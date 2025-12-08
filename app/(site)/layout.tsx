import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header/header";
import "./../globals.css";

import Footer from "./components/footer/footer";
import Providers from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space & Aviation Insights | Aeroway.one",
  description:
    "Welcome to Aeroway, your gateway to aviation and space exploration. Discover inspiring stories, expert insights, and the latest innovations.",
  keywords:
    "Home, Aeroway Aviation and Space Exploration, Aerospace Innovations, Expert Insights, Inspiring Stories, Space Exploration Updates, Aviation Trends",
  authors: [{ name: "Aeroway One Team" }],
  openGraph: {
    title: "Space & Aviation Insights | Aeroway.one",
    description:
      "Welcome to Aeroway, your gateway to aviation and space exploration. Discover inspiring stories, expert insights, and the latest innovations.",
    url: "https://aeroway.one/",
    images: [
      {
        url: "https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/unnamed_11zon.png",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/cropped-cropped-Aeroway-one-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="bg-[#f9fafb] flex flex-col justify-evenly min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
