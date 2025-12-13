"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

/* =======================
   TYPES
======================= */

interface Story {
  id: number;
  story_title: string;
  story_slug: string;
  media_type: "image" | "video";
  cover_image: string;
  formatted_date: string;
}

/* =======================
   DUMMY DATA (TYPE SAFE)
======================= */

const dummyStories: Story[] = [
  {
    id: 1,
    story_title: "First Story",
    story_slug: "first-story",
    media_type: "image",
    cover_image: "https://via.placeholder.com/150",
    formatted_date: "2025-12-13",
  },
  {
    id: 2,
    story_title: "Second Story",
    story_slug: "second-story",
    media_type: "video",
    cover_image: "https://www.w3schools.com/html/mov_bbb.mp4",
    formatted_date: "2025-12-12",
  },
  {
    id: 3,
    story_title: "Third Story",
    story_slug: "third-story",
    media_type: "image",
    cover_image: "https://via.placeholder.com/150",
    formatted_date: "2025-12-11",
  },
];

/* =======================
   COMPONENT
======================= */

const StoryTable: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    // Simulated API response
    setStories(dummyStories);
  }, []);

  const totalStoryCount = stories.length;

  return (
    <div className="p-6 xl:p-12 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Story</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto"
      >
        <div className="flex justify-between p-6">
          <h4 className="text-xl font-semibold text-gray-800">
            Total Story: {totalStoryCount}
          </h4>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="min-w-[100px] py-3 px-4 font-medium text-gray-700">
                S.No
              </th>
              <th className="min-w-[200px] py-3 px-4 font-medium text-gray-700">
                Story Title
              </th>
              <th className="min-w-[120px] py-3 px-4 font-medium text-gray-700">
                Date
              </th>
              <th className="py-3 px-4 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {stories.map((story, idx) => (
              <motion.tr
                key={story.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="border-b border-gray-200"
              >
                <td className="py-4 px-4">
                  {(idx + 1).toString().padStart(2, "0")}
                </td>

                <td className="py-4 px-4">
                  {story.story_title}
                </td>

                <td className="py-4 px-4">
                  <span className="inline-flex rounded-full bg-green-100 text-green-800 py-1 px-3 text-sm font-medium">
                    {story.formatted_date}
                  </span>
                </td>

                <td className="py-4 px-4 flex space-x-4">
                  {/* View Story */}
                  <Link
                    href={`/story/${story.story_slug}`}
                    target="_blank"
                    className="hover:text-blue-500"
                  >
                    👁️
                  </Link>

                  {/* Edit Story */}
                  <Link
                    href={`/story/update/${story.id}`}
                    className="hover:text-blue-500"
                  >
                    ✏️
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default StoryTable;