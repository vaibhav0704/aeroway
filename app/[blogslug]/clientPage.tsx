"use client";

import { fetchBlogs } from "@/redux/slices/blogSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";

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
        <h1 className="text-2xl text-gray-500">Loading Blog...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 px-6 xl:pt-20 min-h-screen bg-[#f9fbff]">
      <div className="xl:w-[60vw]">
        <h1 className="text-4xl mb-4 lg:w-[70%] text-center lg:text-start bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          {blog.blog_title}
        </h1>
        <div>
          <div className="flex justify-between flex-col gap-8 ">
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
            <div className="relative lg:w-2xl h-52 sm:h-80 xl:h-96">
              <Image
                src={blog.blog_feature_image}
                alt={blog.blog_title}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
