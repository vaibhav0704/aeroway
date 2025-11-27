"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchBlogs } from "@/redux/slices/blogSlice";
import { fetchLatestPosts } from "@/redux/slices/postSlice";

// ⬇️ Import your fetch actions here


export default function DebugRedux() {
  const dispatch = useDispatch();

  const blogs = useSelector((state: RootState) => state.blogs);
  const posts = useSelector((state: RootState) => state.posts);
  const auth = useSelector((state: RootState) => state.auth);

  // ⬇️ Dispatch actions here instead of page.tsx
  useEffect(() => {
    console.log("🔄 Dispatching fetch actions from DebugRedux...");
    dispatch(fetchBlogs());
    dispatch(fetchLatestPosts());
  }, [dispatch]);

  // Print Redux state when it updates
  useEffect(() => {
    console.log("=== REDUX DEBUG DATA ===");
    console.log("📘 Blogs:", blogs);
    console.log("📝 Latest Posts:", posts);
    console.log("👤 Auth:", auth);
  }, [blogs, posts, auth]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold">Redux Data Console Page</h1>
      <p>Check your browser console — all Redux data is logged there.</p>
    </div>
  );
}
