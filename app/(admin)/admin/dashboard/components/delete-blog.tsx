"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { deleteBlog, fetchBlogs } from "@/redux/slices/blogSlice";
import { AppDispatch } from "@/redux/store";

interface DeleteProps {
  blogId: string;
}

const Delete: React.FC<DeleteProps> = ({ blogId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
    
      const deletedId = await dispatch(deleteBlog(blogId)).unwrap();

      toast.success("Blog deleted successfully!");
      console.log("Deleted blog ID:", deletedId);
       dispatch(fetchBlogs ());
    } catch (err: any) {
      toast.error(err || "Server Error!"); // error toast
      console.error("Delete error:", err);
    }
  };

  return (
    <div onClick={handleDelete} className="text-red-700 cursor-pointer">
      Delete
    </div>
  );
};

export default Delete;
