"use client";

import React, { useEffect, useState } from "react";
import PopularPostCard from "./popular-post-card";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchLatestPosts } from "@/redux/slices/postSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

interface Blog {
  blog_id: string | number;
  blog_title: string;
  blog_feature_image: string;
  formatted_date: string;
  blog_slug:string

}

const PopularPosts: React.FC = () => {
  const { latestPosts } = useSelector((state: RootState) => state.posts || []);
  const [popularPosts, setPopularPosts] = useState<Blog[]>([]);

  const dispatch=useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLatestPosts());
  }, [dispatch]);


  useEffect(() => {
    if (latestPosts.length > 0) {
      const shuffled = [...latestPosts].sort(() => 0.5 - Math.random());
      setPopularPosts(shuffled.slice(0, 5));
    }
  }, [latestPosts]);

  return (
    <div className="w-full lg:w-[320px] bg-slate-200/60 p-10 rounded-xl">
      <h2
        className="relative inline-block text-3xl mb-4 pl-3
        bg-linear-to-r from-orange-400 to-orange-600
        text-transparent bg-clip-text
        after:content-[''] after:absolute after:left-0 
        after:-bottom-1.5 after:h-1 after:w-[50%] after:bg-orange-600"
      >
        Popular Posts
      </h2>

      <div className="flex flex-col gap-3">
        {popularPosts.map((blog: Blog) => (
          <Link key={blog.blog_id} href={blog.blog_slug}>
           <PopularPostCard
            key={blog.blog_id}
            img={blog.blog_feature_image}
            text={blog.blog_title}
            date={blog.formatted_date}
          /></Link>
         
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
