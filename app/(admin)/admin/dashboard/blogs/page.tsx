"use client";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Delete from "../components/delete-blog";
import { fetchBlogs } from "@/redux/slices/blogSlice";
import Breadcrumb from "../components/bread-crumb";

const Page = () => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const dispatch = useDispatch<AppDispatch>();

  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const displayedBlogs = blogs.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="grid grid-cols-1 gap-6 mx-4 lg:mx-20 my-6">
      <Breadcrumb />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        {/* Table container */}
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                {["S.no", "Image", "Title", "Date", "Actions"].map(
                  (header, idx) => (
                    <th
                      key={idx}
                      className="py-3 px-4 text-left text-gray-600 dark:text-gray-200 text-sm font-medium"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {displayedBlogs.map((item, index) => (
                <motion.tr
                  key={item.blog_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {index + 1}
                  </td>

                  <td className="py-3 px-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden">
                      <img
                        src={item.blog_feature_image}
                        alt={item.blog_title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {item.blog_title}
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                      {item.formatted_date}
                    </span>
                  </td>

                  <td className="py-3 px-4 flex flex-col lg:flex-row justify-center  items-center gap-4">
                    <Link href={`/${item.blog_slug}`}>
                      <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        View
                      </button>
                    </Link>
                    <Link href={`/admin/dashboard/update-blog/${item.blog_slug}`}>
                      <button className="text-yellow-500 hover:text-yellow-700 cursor-pointer">
                        Edit
                      </button>
                    </Link>
                    <Delete blogId={item.blog_id} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleCount < blogs.length && (
          <div className="flex justify-center py-6">
            <button
              onClick={handleShowMore}
              className="px-6 py-2 cursor-pointer bg-orange-400 text-white rounded-lg hover:bg-primary/90"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
