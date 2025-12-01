"use client";

import { fetchBlogs } from "@/redux/slices/blogSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySidebar from "../components/category-sidebar";
import PopularPosts from "../components/home/popular-posts";

export default function ClientPage({ blogslug }: { blogslug: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  const blog = blogs.find((b) => b.blog_slug === blogslug);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    console.log("Single Blog:", blog);
  }, [blog]);

  if (!blog) {
    return (
      <div className="flex justify-center p-4 xl:pt-20 min-h-screen bg-[#f9fbff]">
        <Image alt="loading" height={50} width={800} src={"/images/loading.gif"}/>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:px-80 xl:px-96 justify-center p-4 px-6 xl:pt-20 min-h-screen bg-[#f9fbff]">
      <div className="xl:w-[60vw]">
        <h1 className="text-4xl mb-4 lg:w-[70%] text-center lg:text-start bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          {blog.blog_title}
        </h1>
        <div>
          <div className="flex justify-between lg:w-2xl flex-col gap-8 ">
            <div className="flex items-center gap-3 mt-4">
              <div className="relative w-14 h-14">
                <Image
                  src="/images/fevicon.png"
                  alt="fevicon"
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              <div className="leading-tight">
                <h6 className="font-normal uppercase text-gray-600">
                  Aeroway ONE
                </h6>
                <p className="text-gray-400 text-xs mt-1">
                  {blog.formatted_date}
                </p>
              </div>
            </div>
            <div className="relative  h-52 sm:h-80 xl:h-96">
              <Image
                src={blog.blog_feature_image}
                alt={blog.blog_title}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <div className="text-justify" dangerouslySetInnerHTML={{ __html: blog.blog_content }} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4" >
        <CategorySidebar/>
        <PopularPosts/>
      </div>
    </div>
  );
}
