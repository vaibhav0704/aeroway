'use client';

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import axios from "axios";

import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { setAdmin } from "@/redux/slices/adminSlice";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const admin = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await axios.get("/api/admin", { withCredentials: true });

        if (res.data.authenticated) {
          dispatch(
            setAdmin({
              ...res.data.admin,
              isAuthenticated: true,
            })
          );
        } else {
          router.replace("/admin");
        }
      } catch (err) {
        router.replace("/admin");
      } finally {
        setLoading(false);
      }
    }

    if (!admin.isAuthenticated) {
      fetchAdmin();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Checking admin...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-72">
        <div className="sticky top-0 z-20">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        <main className="flex-1 bg-gray-100 pt-20 lg:pt-0 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
