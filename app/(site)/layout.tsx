"use client";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";


interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="bg-[#f9fafb] flex flex-col min-h-screen">
    
      <Header />

     
      <main className="flex-1">{children}</main>

     
      <Footer />
    </div>
  );
}
