"use client";

import { useState } from "react";
import PostCard from "./post-card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Section2 = () => {
  const [visibleCards, setVisibleCards] = useState(6);

  // Get blogs from store
  const blogs = useSelector((state: RootState) => state.blogs.data || []);

  const showMore = () => {
    if (visibleCards >= blogs.length) {
      setVisibleCards(6); 
    } else {
      setVisibleCards((prev) => prev + 3);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, visibleCards).map((blog) => (
          <PostCard key={blog.blog_id} blog={blog} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={showMore}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {visibleCards >= blogs.length ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Section2;
