"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Breadcrumb from "../components/bread-crumb";
import axios from "axios";
import { toast } from "sonner";

interface Story {
  id: number;
  title: string;
  media_type: "image" | "video";
  cover_image: string;
  description: string;
  formatted_date: string;
  story_slug: string;
}

const StoryTable: React.FC = () => {
  const [storyData, setStoryData] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalStories, setTotalStories] = useState(0); // <-- total count from backend
  const limit = 4;

  const loadStories = async (pageNumber: number) => {
    try {
      const response = await axios.get(
        `/api/story/fetchAll?page=${pageNumber}&limit=${limit}`
      );

      
      const { data: stories, total } = response.data;

      const formatted = stories.map((item: any) => ({
        id: item.id,
        title: item.title,
        media_type: item.media_type,
        cover_image: item.cover_image,
        description: item.description,
        formatted_date: new Date(item.created_date)
          .toISOString()
          .split("T")[0],
        story_slug: item.story_slug,
      }));

      if (formatted.length < limit) setHasMore(false);

      // Update total stories
      setTotalStories(total);

      setStoryData((prev) => {
        const combined = [...prev, ...formatted];
        const unique = combined.filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj.id === item.id)
        );
        return unique;
      });
    } catch (error) {
      console.error("Error loading stories", error);
      toast.error("Failed to load stories");
    }
  };

  useEffect(() => {
    loadStories(1);
  }, []);

  const loadMoreStories = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadStories(nextPage);
  };

  const handleDelete = async (storyId: number) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      const response = await axios.delete(`/api/story/delete/${storyId}`);
      if (response.data.success) {
        toast.success(response.data.message);

        
        setStoryData((prev) => prev.filter((story) => story.id !== storyId));

     
        setTotalStories((prev) => prev - 1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 mx-4 lg:mx-20 my-6">
      <Breadcrumb pageName="Story" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm bg-white px-5 pt-6 pb-2.5 shadow-default shadow-sm dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-between gap-4.5 py-4">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Total Stories: {totalStories}
            </h4>
          </div>

          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left dark:bg-meta-4">
                  <th className="py-4 px-4">S.no</th>
                  <th className="py-4 px-4">Story Title</th>
                  <th className="py-4 px-4">Image/Video</th>
                  <th className="py-4 px-4">Caption</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {storyData.map((story, index) => (
                  <tr key={story.id}>
                    <td className="shadow py-5 px-4">
                      {(index + 1).toString().padStart(2, "0")}
                    </td>

                    <td className="shadow py-5 px-4">{story.title}</td>

                    <td className="shadow py-8 px-4">
                      <div className="h-32 w-40 rounded-md">
                        {story.media_type === "video" ? (
                          <video controls className="w-full h-full object-cover">
                            <source src={story.cover_image} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={story.cover_image}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                      </div>
                    </td>

                    <td className="shadow-sm py-5 px-4">{story.description}</td>

                    <td className="shadow-sm py-5 px-4">
                      <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm">
                        {story.formatted_date}
                      </span>
                    </td>

                    <td className="shadow-sm py-5 px-4">
                      <div className="flex flex-col lg:flex-row items-center gap-4">
                        <Link href={`/story/${story.story_slug}`}>
                          <button className="text-blue-500 cursor-pointer">View</button>
                        </Link>

                        <Link href={`/admin/dashboard/stories/edit/${story.id}`}>
                          <button className="text-orange-600 cursor-pointer">Edit</button>
                        </Link>

                        <button
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDelete(story.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMore && (
            <div className="flex justify-center my-6">
              <button
                onClick={loadMoreStories}
                className="px-6 py-2 bg-orange-400 hover:bg-orange-500 cursor-pointer text-white rounded-md"
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryTable;
