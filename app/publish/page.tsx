"use client";

import { useState } from "react";
import axios from "axios";

export default function PublishPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [maglink, setMaglink] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [magcloud, setMagcloud] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setCover(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("magazine_title", title);
      fd.append("magazine_description", description);
      fd.append("magazine_tags", tags);
      fd.append("magazine_link", maglink);
      fd.append("magazine_date", date);
      fd.append("magazine_category", category);
      fd.append("MagCloudLink", magcloud);
      if (cover) fd.append("magazine_cover_image", cover);

      await axios.put("/api/admin/magazines/add", fd); // backend to be added later
      setMessage("Publication request submitted (backend not implemented)");
    } catch (err) {
      console.error(err);
      setMessage("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Add Publication</h1>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded mb-2" />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" className="w-full border p-2 rounded mb-2" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded mb-2" />
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags" className="w-full border p-2 rounded mb-2" />
        <input type="file" accept="image/*" onChange={handleFile} className="w-full mb-2" />
        <input value={maglink} onChange={(e) => setMaglink(e.target.value)} placeholder="PDF link" className="w-full border p-2 rounded mb-2" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded mb-2" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full border p-2 rounded mb-2" />
        <input value={magcloud} onChange={(e) => setMagcloud(e.target.value)} placeholder="MagCloud Link" className="w-full border p-2 rounded mb-2" />

        <div className="mt-4 flex gap-2">
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
            {loading ? "Submitting..." : "Add Publication"}
          </button>
          {message && <div className="text-sm text-gray-600">{message}</div>}
        </div>
      </div>
    </div>
  );
}
