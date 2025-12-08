"use client";

import { useEffect, useState } from "react";
import PostCard from "./post-card";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchBlogs } from "@/redux/slices/blogSlice";
import { motion } from "framer-motion";

const Section2 = () => {
  const [visibleCards, setVisibleCards] = useState(6);
  const dispatch = useDispatch<AppDispatch>();


  const blogs = useSelector((state: RootState) => state.blogs.blogs || []);

  
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

  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogs.slice(0, visibleCards).map((blog, index) => (
          <motion.div
            key={blog.blog_id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <PostCard blog={blog} />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={showMore}
          className="px-6 py-2 text-white font-bold mb-4 pl-3
             bg-linear-to-r from-orange-600 to-orange-300 rounded-md cursor-pointer
             transition"
        >
          {visibleCards >= blogs.length ? "Show Less" : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Section2;
