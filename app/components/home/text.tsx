"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBlogs } from "@/redux/slices/blogSlice";
import { useRouter } from "next/navigation";

interface Blog {
  id: number;
  category_name: string;
  category_slug: string;
  blog_feature_image: string;
}

interface RootState {
  blogs: {
    blogs: Blog[];
  };
}

export default function Hero2() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { blogs } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs() as any);
  }, [dispatch]);

  const uniqueCategories: Blog[] = blogs
    ? [...new Map(blogs.map((b) => [b.category_slug, b])).values()]
    : [];

  return (
    <div className="xl:max-w-[60vw] mx-auto">
      <div className="text-center mb-10">
        <h6 className="text-gray-600/40 font-bold text-xl">Explore within...</h6>

        <h1 className="">
          AVIATION <span className="text-orange-400">SPACE</span>
        </h1>
      </div>

      
      <ul
        className="
          grid
          grid-cols-2 sm:grid-cols-3 xl:grid-cols-4
          gap-4
          justify-center
        "
      >
        {uniqueCategories.map((item, index) => (
          <li key={index} className="flex items-center justify-center">
            <Link className="flex items-center justify-center" href={`/category/${item.category_slug}`}>
              <div
                className="
                  flex items-start gap-3
                  p-4
                  bg-slate-400/20 hover:bg-white/20
                  rounded-xl shadow-md
                  hover:scale-[1.05]
                  transition-transform duration-200
                  max-w-[180px]     /* prevents overflow */
                "
              >
                {/* Image */}
                <div className="relative w-8 h-8 self-center rounded-full overflow-hidden bg-white shrink-0">
                  <Image
                    src={item.blog_feature_image}
                    alt={item.category_name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>

                <span className="text-gray-800 font-medium text-center opacity-50 wrap-break-words">
                  {item.category_name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
