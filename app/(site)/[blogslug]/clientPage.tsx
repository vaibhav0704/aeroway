"use client";

import { fetchBlogs } from "@/redux/slices/blogSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySidebar from "../components/category-sidebar";
import PopularPosts from "../components/home/popular-posts";

export default function ClientPage({ blogslug }: { blogslug: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth);

  const blog = blogs.find((b) => b.blog_slug === blogslug);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (blog?.blog_id) loadComments();
  }, [blog?.blog_id]);

  async function loadComments() {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/comments/get-comments?blog_id=${blog.blog_id}`
      );
      const data = await res.json();
      setAllComments(data.comments || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function handleAddComment() {
    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!comment.trim()) return;

    try {
      const res = await fetch("/api/comments/post-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blog_id: blog.blog_id,
          user_id: user.userId,
          comment_text: comment,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setComment("");
        loadComments();
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fbff] text-center">

        <h1 className="text-8xl touch-pinch-zoom animate-bounce  font-bold bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-center text-4xl" >Oops! Page not found.</p>
        <p className="mt-3 text-lg text-gray-600 max-w-md">
         The page you’re looking for doesn’t exist. It might have been removed, or you may have mistyped the address.
        </p>

        <Link
          href="/"
          className="mt-6 px-6 py-3 rounded-xl bg-linear-to-r from-orange-600 to-orange-400 text-white shadow-md hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
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
          <div className="flex justify-between lg:w-2xl flex-col gap-8">
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

            <div className="relative h-52 sm:h-80 xl:h-96">
              <Image
                src={blog.blog_feature_image}
                alt={blog.blog_title}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <div
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: blog.blog_content }}
            />

         
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className=" p-2"
            >
              <h3 className="text-2xl font-semibold mb-4 text-slate-500">
                Leave a Comment
              </h3>

              <div className="flex flex-col gap-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-3 rounded-xl focus:outline-none bg-slate-200/60"
                  rows={4}
                />

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleAddComment}
                  className="px-6 py-2 w-fit self-end cursor-pointer bg-linear-to-r from-orange-600 to-orange-400 text-white rounded-xl shadow hover:opacity-90 transition"
                >
                  Post Comment
                </motion.button>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {loading ? (
                  <p className="text-gray-400 text-sm">Loading comments...</p>
                ) : allComments.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No comments yet. Be the first!
                  </p>
                ) : (
                  allComments.map((c, i) => (
                    <motion.div
                      key={c.comment_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-3 bg-[#f9fbff] border rounded-xl shadow-sm"
                    >
                      <p className="font-semibold text-gray-700">
                        {c.username ?? "User"}
                      </p>
                      <p className="text-gray-700">{c.comment_text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(c.created_at).toLocaleString()}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <CategorySidebar />
        <PopularPosts />
      </div>
    </div>
  );
}
