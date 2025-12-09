"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 bottom-0 h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="sticky top-0 left-0 right-0">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
  
      <main className="flex-1 -z-10 bg-gray-100 pt-20 lg:pt-0 ">
        {children}
      </main>
    </div>
  );
}
