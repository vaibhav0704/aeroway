"use client";

import { useSelector } from "react-redux";
import InfoCard from "./info-card";
import PopularPostCard from "./popular-post-card";
import { RootState } from "@/redux/store";
import PopularPosts from "./popular-posts";

const iconPath = "/icon.png";

const Section3 = () => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs || []);

  const limitedBlogs = blogs.slice(0, 6);

  return (
    <div className=" w-full  flex flex-col lg:flex-row gap-10 justify-center">
      <div className="flex-1">
        <div className="grid md:grid-cols-2 gap-4">
          {limitedBlogs.map((blog) => (
            <InfoCard
              key={blog.blog_id}
              text={blog.blog_title}
              date={blog.formatted_date}
              onReadMore={() =>
                (window.location.href = `/blog/${blog.blog_slug}`)
              }
            />
          ))}
        </div>
      </div>

      <PopularPosts/>
    </div>
  );
};

export default Section3;
