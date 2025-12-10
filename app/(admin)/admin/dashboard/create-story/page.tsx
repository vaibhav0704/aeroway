"use client";

import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/bread-crumb";
import { toast } from "sonner";

interface Story {
  id: number;
  caption: string;
  mediaType: "image" | "video";
  files: File[];
  previews: string[];
}

const CreateWebStory: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([
    { id: Date.now(), caption: "", mediaType: "image", files: [], previews: [] },
  ]);
  const [title, setTitle] = useState("");
  const [storyTags, setStoryTags] = useState("");
  const [storyDate, setStoryDate] = useState("");
  const [storyTime, setStoryTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (id: number, field: keyof Story, value: any) => {
    setStories(
      stories.map((story) => (story.id === id ? { ...story, [field]: value } : story))
    );
  };

  const handleFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setStories(
      stories.map((story) =>
        story.id === id
          ? { ...story, files: selectedFiles, previews: selectedFiles.map((f) => URL.createObjectURL(f)) }
          : story
      )
    );
  };

  const handleAddMoreStory = () => {
    setStories([...stories, { id: Date.now(), caption: "", mediaType: "image", files: [], previews: [] }]);
  };

  const handleRemoveStory = (id: number) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !storyDate || !storyTime) return;

    const validStories = stories.filter((story) => story.caption && story.files.length > 0);
    if (validStories.length === 0) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("storyTags", storyTags);
      formData.append("date", storyDate);
      formData.append("time", storyTime);

      validStories.forEach((story) => {
        formData.append("stories", JSON.stringify({ caption: story.caption, mediaType: story.mediaType }));
        formData.append("files", story.files[0]); // one file per story
      });

      const res = await axios.post("/api/story/add-story", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(res.data.message){
        toast.success(res.data.message);
      }
      

    
      setTitle("");
      setStoryTags("");
      setStoryDate("");
      setStoryTime("");
      setStories([{ id: Date.now(), caption: "", mediaType: "image", files: [], previews: [] }]);
    } catch (err: any) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 xl:px-20 flex flex-col gap-6 pt-6 min-h-screen">
      <Breadcrumb pageName="Create Story" />
      <div className="mx-auto p-6 w-full rounded-lg shadow-lg bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="p-4 rounded-md shadow-md bg-gray-50 flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700">Story Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 w-full rounded-md border border-slate-300 bg-white focus:border-orange-300 focus:ring-0 outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700">Story Tags:</label>
              <input
                type="text"
                value={storyTags}
                onChange={(e) => setStoryTags(e.target.value)}
                className="p-2 w-full rounded-md border border-slate-300 bg-white focus:border-orange-300 focus:ring-0 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700">Select Story Date:</label>
              <input
                type="date"
                value={storyDate}
                onChange={(e) => setStoryDate(e.target.value)}
                className="p-2 w-full rounded-md border border-slate-300 bg-white focus:border-orange-300 focus:ring-0 outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700">Select Story Time:</label>
              <input
                type="time"
                value={storyTime}
                onChange={(e) => setStoryTime(e.target.value)}
                className="p-2 w-full rounded-md border border-slate-300 bg-white focus:border-orange-300 focus:ring-0 outline-none"
              />
            </div>
          </div>

          {stories.map((story, index) => (
            <div key={story.id} className="p-4 rounded-md shadow-md bg-gray-50">
              <h3 className="font-bold mb-2">Story {index + 1}</h3>

              <input
                type="text"
                placeholder="Story Caption"
                value={story.caption}
                onChange={(e) => handleInputChange(story.id, "caption", e.target.value)}
                className="p-2 w-full rounded-md border border-slate-300 bg-white focus:border-orange-300 focus:ring-0 outline-none mb-2"
              />

              <label className="block mb-1 text-sm font-medium text-gray-700">Media Type:</label>
              <select
                value={story.mediaType}
                onChange={(e) => handleInputChange(story.id, "mediaType", e.target.value as "image" | "video")}
                className="p-2 w-full rounded-md border border-slate-300 bg-white focus:border-orange-300 focus:ring-0 outline-none mb-2"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>

              <input
                type="file"
                accept={story.mediaType === "image" ? "image/*" : "video/*"}
                onChange={(e) => handleFileChange(story.id, e)}
                className="p-2 w-full rounded-md border border-slate-300 bg-white focus:border-orange-300 focus:ring-0 outline-none mt-2"
              />

              {stories.length > 1 && (
                <button type="button" onClick={() => handleRemoveStory(story.id)} className="mt-3 text-red-500 font-bold text-sm">
                  Remove Story
                </button>
              )}
            </div>
          ))}

          <div className="flex justify-between gap-4 mt-4">
            <button type="button" onClick={handleAddMoreStory} className="rounded border border-slate-300 py-2 px-6">
              + Add More Story
            </button>
            <button type="submit" disabled={isSubmitting} className="rounded bg-orange-400 py-2 px-6 hover:bg-orange-500 text-white cursor-pointer">
              {isSubmitting ? "Uploading..." : "Create Story"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWebStory;
