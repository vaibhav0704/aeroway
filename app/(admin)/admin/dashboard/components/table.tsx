"use client";

import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSelector } from "react-redux";
import Delete from "./delete-blog";

const TableOne = () => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);


 
  const maxDisplay = 5;
  const displayedBlogs = blogs.slice(0, maxDisplay);

  return (
    <div className="bg-white max-w-[90vw] overflow-scroll dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Latest Blogs
      </h4>

      <div className="overflow-x-scroll max-w-screen">
        <table className="w-full table-auto  border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              {["S.no", "Image", "Title", "Date", "Actions"].map((header, idx) => (
                <th
                  key={idx}
                  className="py-3 px-4 text-left text-gray-600 dark:text-gray-200 text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {displayedBlogs.map((item, index) => (
              <motion.tr
                key={item.blog_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="py-3 px-4 text-gray-900 dark:text-white">{index + 1}</td>

                <td className="py-3 px-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden">
                    <img src={item.blog_feature_image} alt={item.title} className="object-cover w-full h-full" />
                  </div>
                </td>

                <td className="py-3 px-4 text-gray-900 dark:text-white">{item.blog_title}</td>

                <td className="py-3 px-4">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                    {item.formatted_date}
                  </span>
                </td>

                <td className="py-3 px-4 flex flex-col items-center justify-center lg:flex-row space-x-3">
                  <Link href={`/${item.blog_slug}`}>
                    <button className="text-blue-500 hover:text-blue-700 cursor-pointer">View</button>
                  </Link>
                   <Link href={`/admin/dashboard/update-blog/${item.blog_slug}`}>  <button className="text-yellow-500 hover:text-yellow-700 cursor-pointer">Edit</button></Link>
                  <Delete blogId={item.blog_id} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <Link href="/admin/dashboard/blogs">
          <button className="px-6 py-2 rounded-lg bg-primary text-white bg-orange-400 cursor-pointer hover:bg-primary/90 transition">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TableOne;
