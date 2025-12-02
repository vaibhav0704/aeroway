"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NextImage from "next/image";
import NextLink from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

interface Magazine {
  magazine_id: number;
  idMagazines: number;
  magazine_title: string;
  magazine_description: string;
  magazine_tags?: string;
  magazine_cover_image: string;
  magazine_link?: string;
  formatted_date: string;
  magazine_category?: string;
  MagCloudLink?: string;
}

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full" />
    <p className="mt-4 text-gray-600 text-sm">Loading ...</p>
  </div>
);

export default function SinglePublications() {
  const { magazine_slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [magazine, setMagazine] = useState<Magazine | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    async function fetchOneData() {
      try {
        const response = await axios.get(`/api/magazine/fetchone/${magazine_slug}`);

        if (response.status === 200 && response.data) {
          setMagazine(response.data);
          setFetchError(false);
        } else {
          setFetchError(true);
        }
      } catch {
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchOneData();
  }, [magazine_slug]);

  if (loading) return <Loader />;

  if (fetchError || !magazine) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center text-xl font-semibold">
        Not Found
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto pt-20 lg:pt-32 xl:pt-40 px-4 lg:px-3 md:px-10 py-10 flex flex-col items-center">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 justify-center ">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          <NextLink
            href={magazine?.MagCloudLink || "#"}
            target="_blank"
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 mx-auto">
              <NextImage
                src={magazine.magazine_cover_image}
                alt={magazine.magazine_title}
                fill
                className="object-cover shadow-lg"
              />
            </div>
            <span className="mt-6 px-4 py-2 rounded-full text-blue-400 hover:text-orange-500/60 text-sm hover:scale-105 transition-transform">
              Want to buy? Click here ↑
            </span>
          </NextLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-3 flex justify-center text-justify"
        >
          <div
            className="text-[#7e8cc7] text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: magazine.magazine_description }}
          />
        </motion.div>
      </div>

      <iframe
        src={magazine.magazine_link}
        className="w-full mt-20 mx-auto rounded-lg"
        style={{ height: "800px", border: "none" }}
      />

      <h2 className="text-4xl mb-4 text-left bg-linear-to-r from-orange-600 via-orange-500 to-orange-200 bg-clip-text text-transparent">
        Tags
      </h2>

      <div className="flex flex-wrap gap-3">
        {magazine.magazine_tags &&
        typeof magazine.magazine_tags === "string" ? (
          magazine.magazine_tags.split(", ").map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-md text-[#7e9cc7] capitalize border border-[#7e9cc7] transition"
            >
              {tag}
            </span>
          ))
        ) : (
          <span>No tags available</span>
        )}
      </div>
    </div>
  );
}
