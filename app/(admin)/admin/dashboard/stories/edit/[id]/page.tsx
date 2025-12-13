"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Breadcrumb from "../../../components/bread-crumb";

interface Story {
  id: number;
  title: string;
  description: string;
  mediaType: "image" | "video";
  coverImage: string;
  file?: File | null;
}

const EditWebStory: React.FC = () => {
  const params = useParams();
  const storyId = Number(params?.id);

  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================
  // Fetch single story
  // ============================
  useEffect(() => {
    if (!storyId || isNaN(storyId)) return;

    const fetchStory = async () => {
      try {
        const res = await axios.get(
          `/api/story/fetch-one/${storyId}`
        );

        const data = res.data?.data;

        setStory({
          id: data.id,
          title: data.title || "",
          description: data.description || "",
          mediaType: data.media_type || "image",
          coverImage: data.cover_image || "",
          file: null,
        });
      } catch (error) {
        toast.error("Failed to fetch story");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  // ============================
  // File Change
  // ============================
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || !story) return;

    const file = e.target.files[0];

    setStory({
      ...story,
      file,
      coverImage: URL.createObjectURL(file),
    });
  };

  // ============================
  // Update Story
  // ============================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (!story) return;

    if (!story.title) {
      toast.error("Title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", story.title);
      formData.append("description", story.description);
      formData.append("mediaType", story.mediaType);

      if (story.file) {
        formData.append("file", story.file);
      }

      const res = await axios.put(
        `/api/story/update/${story.id}`,
        formData
      );

      toast.success(
        res.data.message ||
          "Story updated successfully"
      );
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================
  // Loading
  // ============================
  if (isLoading) {
    return (
      <div className="p-10 text-center">
        Loading story...
      </div>
    );
  }

  if (!story) {
    return (
      <div className="p-10 text-center">
        Story not found
      </div>
    );
  }

  // ============================
  // UI
  // ============================
  return (
    <div className="px-4 xl:px-20 flex flex-col gap-6 pt-6 min-h-screen">
      <Breadcrumb pageName="Edit Story" />

      <div className="mx-auto p-6 w-full rounded-lg shadow-lg bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Story Title
            </label>
            <input
              type="text"
              value={story.title}
              onChange={(e) =>
                setStory({
                  ...story,
                  title: e.target.value,
                })
              }
              className="p-2 w-full rounded-md border border-slate-300 bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={story.description}
              onChange={(e) =>
                setStory({
                  ...story,
                  description: e.target.value,
                })
              }
              className="p-2 w-full rounded-md border border-slate-300 bg-white"
            />
          </div>

          {/* Preview */}
          {story.coverImage && (
            <div>
              {story.mediaType === "image" ? (
                <img
                  src={story.coverImage}
                  className="w-48 rounded"
                  alt="preview"
                />
              ) : (
                <video
                  src={story.coverImage}
                  controls
                  className="w-48 rounded"
                />
              )}
            </div>
          )}

          {/* Media Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Media Type
            </label>
            <select
              value={story.mediaType}
              onChange={(e) =>
                setStory({
                  ...story,
                  mediaType: e.target.value as
                    | "image"
                    | "video",
                })
              }
              className="p-2 w-full rounded-md border border-slate-300 bg-white"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          {/* File */}
          <input
            type="file"
            accept={
              story.mediaType === "image"
                ? "image/*"
                : "video/*"
            }
            onChange={handleFileChange}
            className="p-2 w-full rounded-md border border-slate-300 bg-white"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-orange-400 py-2 px-6 hover:bg-orange-500 text-white"
            >
              {isSubmitting
                ? "Updating..."
                : "Update Story"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWebStory;
