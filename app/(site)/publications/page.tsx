"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchMagazines, Magazine } from "@/redux/slices/magazineSlice";
import type { RootState, AppDispatch } from "@/redux/store";

export default function PublicationsClient() {
  const dispatch = useDispatch<AppDispatch>();
  const { magazines, loading } = useSelector(
    (state: RootState) => state.magazines
  );

  const [visibleCount, setVisibleCount] = useState<number>(6);
  const itemsPerLoad = 6;

  useEffect(() => {
    dispatch(fetchMagazines());
  }, [dispatch]);

  const loadMoreMagazines = () =>
    setVisibleCount((prev) => prev + itemsPerLoad);

  return (
    <div className="w-full flex flex-col items-center py-16 justify-center px-4 md:px-10 lg:px-20">
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="h-12 w-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      ) : magazines.length > 0 ? (
        <>
          <div className="grid xl:max-w-4xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {magazines.slice(0, visibleCount).map((item: Magazine, index) => (
              <motion.div
                key={item.idMagazines}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, animationDuration: 0.1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/publications/${item.magazine_slug}`}
                  className="scale-100 hover:scale-105 transition-transform duration-100"
                >
                  <h4 className="mt-4 transition">{item.magazine_title}</h4>
                  <div className="overflow-hidden shadow-lg hover:shadow-xl w-fit transition-all duration-300">
                    <Image
                      src={item.magazine_cover_image}
                      alt={item.magazine_title}
                      width={300}
                      height={600}
                      className="aspect-auto object-cover"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {visibleCount < magazines.length && (
            <div className="text-center mt-10">
              <button
                onClick={loadMoreMagazines}
                className="px-3 py-1 text-sm bg-linear-to-r from-orange-600 to-yellow-400 rounded-md text-white hover:opacity-90 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-400">No publications found.</p>
      )}
    </div>
  );
}
