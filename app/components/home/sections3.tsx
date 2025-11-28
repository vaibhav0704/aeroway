"use client";

import { useSelector } from "react-redux";
import InfoCard from "./info-card";
import PopularPostCard from "./popular-post-card";
import { RootState } from "@/redux/store";

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

      
      <div className="w-full lg:w-[320px] bg-slate-200/60 p-10 rounded-xl">
        <h2
          className="relative inline-block text-3xl  mb-4 pl-3
    bg-linear-to-r from-orange-400  to-orange-600
    text-transparent bg-clip-text
    after:content-[''] after:absolute after:left-0 
    after:-bottom-1.5   /* GAP ADDED HERE */
    after:h-1 after:w-[50%] after:bg-orange-600"
        >
          Popular Posts
        </h2>

        <div className="flex flex-col gap-3">
          {limitedBlogs.map((blog) => (
            <PopularPostCard
              key={blog.blog_id}
              img={blog.blog_feature_image}
              text={blog.blog_title}
              date={blog.formatted_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
