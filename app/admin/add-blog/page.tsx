"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { generateSlug as clientGenerateSlug  } from "../../api/utils/slug";

type Category = {
  category_id: number;
  category_name: string;
  category_slug: string;
};

export default function AddBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [featureImage, setFeatureImage] = useState<File | null>(null);
  const [publisherId, setPublisherId] = useState<string>("1");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("09:00");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const dispatch = useDispatch();


  const categories: Category[] = useSelector((state: any) => {
    if (!state) return [];
    if (state.categories && Array.isArray(state.categories)) return state.categories;
    if (state.categories && Array.isArray(state.categories.list)) return state.categories.list;
    if (state.category && Array.isArray(state.category.list)) return state.category.list;
    return [];
  });

  useEffect(() => {
    setSlug(
      title
        .toLowerCase()
        .replace(/'/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  }, [title]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFeatureImage(e.target.files[0]);
  };

  const handleAddCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    try {
      const slugForCategory = clientGenerateSlug(trimmed);

      const res = await axios.post("/api/admin/category/add", { category: trimmed });

      if (res.status === 200) {
        const optimisticId = Date.now();
        dispatch({
          type: "CATEGORY_ADD",
          payload: {
            category_id: optimisticId,
            category_name: trimmed,
            category_slug: slugForCategory,
          },
        });

        setNewCategoryName("");
        setShowAddCategory(false);

        
        setCategoryId(String(optimisticId));
      } else {
        console.error("Failed to add category", res.data);
      }
    } catch (err: any) {
      console.error("Add category error", err);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setMessage("Title required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const contentHtml = editorRef.current?.innerHTML || "";

      const fd = new FormData();
      fd.append("blog_title", title);
      fd.append("blog_tag", tag);
      fd.append("blog_category_id", categoryId);
      fd.append("blog_description", description);
      fd.append("blog_content", contentHtml);
      fd.append("blog_publisher_id", publisherId);
      fd.append("blog_date", date);
      fd.append("blog_time", time);
      fd.append("blog_slug", slug);
      if (featureImage) fd.append("blog_feature_image", featureImage);

      const res = await axios.put("/api/blogs/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setMessage("Blog added successfully");
        setTitle("");
        setDescription("");
        setTag("");
        setCategoryId("");
        setFeatureImage(null);
        if (editorRef.current) editorRef.current.innerHTML = "";
      } else {
        setMessage("Error adding blog");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border p-2 rounded" />
          <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug (auto)" className="border p-2 rounded" />
        </div>

        <div className="mt-4">
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className="w-full border p-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <input name="tag" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tags (comma separated)" className="border p-2 rounded" />

          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border p-2 rounded">
            <option value="">Select Category</option>
            {Array.isArray(categories) &&
              categories.map((c) => (
                <option key={c.category_id} value={String(c.category_id)}>
                  {c.category_name}
                </option>
              ))}
          </select>

          <div className="flex gap-2">
            <button type="button" onClick={() => setShowAddCategory(true)} className="px-3 py-2 bg-gray-200 rounded">
              + Add Category
            </button>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 font-medium">Content (paste rich HTML or type)</div>
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[200px] border p-4 rounded prose max-w-full"
            suppressContentEditableWarning
            style={{ outline: "none" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border p-2 rounded" />
          <input type="text" value={publisherId} onChange={(e) => setPublisherId(e.target.value)} className="border p-2 rounded" />
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button onClick={handleSubmit} disabled={loading} className="px-6 py-2 bg-amber-600 text-white rounded disabled:opacity-50">
            {loading ? "Submitting..." : "Add Blog"}
          </button>

          {message && <div className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</div>}
        </div>
      </div>

      {showAddCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Add Category</h3>
            <input className="w-full border p-2 rounded mb-3" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Category name" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddCategory(false)} className="px-3 py-2 rounded border">
                Cancel
              </button>
              <button onClick={handleAddCategory} className="px-3 py-2 rounded bg-amber-600 text-white">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
