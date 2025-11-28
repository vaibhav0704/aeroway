"use client";

import { useEffect, useState } from "react";
import PostCard from "./post-card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchBlogs } from "@/redux/slices/blogSlice";

const Section2 = () => {
  const [visibleCards, setVisibleCards] = useState(6);
  const dispatch = useDispatch();

  // ✅ Correct selector based on your slice structure
  const blogs = useSelector((state: RootState) => state.blogs.blogs || []);

  // 🚀 Fetch blogs on mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);


  const showMore = () => {
    if (visibleCards >= blogs.length) {
      setVisibleCards(6);
    } else {
      setVisibleCards((prev) => prev + 4);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {blogs.slice(0, visibleCards).map((blog) => (
          <PostCard key={blog.blog_id} blog={blog} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={showMore}
          className="px-6 py-2  text-white  font-bold mb-4 pl-3
             bg-linear-to-r from-orange-600  to-orange-300 rounded-md cursor-pointer
             transition"
        >
          {visibleCards >= blogs.length ? "Show Less" : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Section2;
