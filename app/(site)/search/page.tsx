"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchBlogs } from "@/redux/slices/blogSlice";
import PostCard from "../components/home/post-card";
import { motion, Variants } from "framer-motion";

type Blog = {
  blog_feature_image: string;
  blog_title: string;
  blog_description: string;
  formatted_date: string;
  category_name: string;
  blog_slug: string;
};

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-600 mb-4"></div>
    <p className="text-gray-600">Loading ...</p>
  </div>
);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

/* ------------------------------ */
/*  WRAPPED COMPONENT (required)  */
/* ------------------------------ */
function SearchBlogContent() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("discover") ?? "";

  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState(12);
  const [loading, setLoading] = useState(true);

  const { blogs } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBlogs())
      .unwrap()
      .catch((err) => console.error("Error fetching blogs:", err))
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const allBlogs: Blog[] = (blogs as Blog[]) ?? [];

    if (!searchQuery) {
      setFilteredBlogs(allBlogs);
      setVisibleBlogs(12);
      return;
    }

    const regex = new RegExp(searchQuery, "i");

    const fb = allBlogs.filter(
      (blog) =>
        regex.test(blog.category_name) ||
        regex.test(blog.blog_title) ||
        (blog.blog_description && regex.test(blog.blog_description)) ||
        regex.test(blog.formatted_date)
    );

    setFilteredBlogs(fb);
    setVisibleBlogs(12);
  }, [searchQuery, blogs]);

  const showMore = () => {
    if (visibleBlogs >= filteredBlogs.length) {
      setVisibleBlogs(12);
    } else {
      setVisibleBlogs((prev) => prev + 12);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="p-6 w-full max-w-7xl">
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-16">
            No blogs available.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
                <motion.div
                  key={blog.blog_slug}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <PostCard blog={blog} />
                </motion.div>
              ))}
            </div>

            {filteredBlogs.length > 12 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={showMore}
                  className="px-6 py-2 text-white font-bold mb-4
                    bg-linear-to-r from-orange-600 to-orange-300 rounded-md cursor-pointer
                    transition"
                >
                  {visibleBlogs >= filteredBlogs.length ? "Show Less" : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ */
/*  MAIN EXPORT WITH SUSPENSE     */
/* ------------------------------ */
export default function SearchBlogPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchBlogContent />
    </Suspense>
  );
}
