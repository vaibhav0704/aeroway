"use client";

import PostCard from "@/app/components/home/post-card";
import { fetchBlogs } from "@/redux/slices/blogSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Helper to generate slug from name
const generateSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

interface CategoryClientPageProps {
  category: string;
}

export default function CategoryClientPage({ category }: CategoryClientPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const [visibleCards, setVisibleCards] = useState(6);

  // Filter blogs by category slug
  const categoryBlogs = blogs.filter(
    (b) => generateSlug(b.category_name) === category
  );

  const showMore = () => {
    if (visibleCards >= categoryBlogs.length) {
      setVisibleCards(6);
    } else {
      setVisibleCards((prev) => prev + 4);
    }
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);


  if (categoryBlogs.length === 0) {
    return (
      <div className="flex justify-center p-4 xl:pt-20 min-h-screen bg-[#f9fbff]">
        <h1 className="text-2xl text-gray-500">Loading Blogs...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 px-6 xl:pt-20 min-h-screen bg-[#f9fbff]">
      <div className="2xl:w-[60vw]">
        <h1 className="text-4xl mb-4 lg:w-[70%] text-center lg:text-start bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          {categoryBlogs[0].category_name || "No Result found"}
        </h1>

        <div className="flex justify-between flex-col gap-8">
          {/* Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 gap-x-0">
            {categoryBlogs.slice(0, visibleCards).map((blog) => (
              <PostCard key={blog.blog_id} blog={blog} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={showMore}
              className="px-6 py-2 text-white font-bold mb-4 pl-3
                bg-linear-to-r from-orange-600 to-orange-300 rounded-md cursor-pointer
                transition"
            >
              {visibleCards >= categoryBlogs.length ? "Show Less" : "Load More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
