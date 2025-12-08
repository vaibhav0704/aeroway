"use client";

import Link from "next/link";
import { FaBook, FaNewspaper } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/add-blog" className="block">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition flex items-center gap-4">
              <FaBook className="text-4xl text-orange-500" />
              <div>
                <h2 className="text-lg font-semibold">Add Blog</h2>
                <p className="text-sm text-gray-500">Create and manage blog posts</p>
              </div>
            </div>
          </Link>

          <Link href="/publish" className="block">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition flex items-center gap-4">
              <FaNewspaper className="text-4xl text-blue-500" />
              <div>
                <h2 className="text-lg font-semibold">Add Publication</h2>
                <p className="text-sm text-gray-500">Publish magazines & PDFs</p>
              </div>
            </div>
          </Link>

          <Link href="/admin/categories" className="block">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition flex items-center gap-4">
              <div className="text-4xl text-green-500">🏷️</div>
              <div>
                <h2 className="text-lg font-semibold">Categories</h2>
                <p className="text-sm text-gray-500">View and add categories</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
