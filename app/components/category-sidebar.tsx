"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchBlogByCategory } from "@/redux/slices/blogSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";
import type { RootState, AppDispatch } from "@/redux/store";
import { fetchLatestPosts } from "@/redux/slices/postSlice";

interface Category {
  category_name: string;
  category_slug: string;
}

interface Post {
  blog_slug: string;
  blog_title: string;
  blog_feature_image: string;
  formatted_date: string;
}

const CategorySidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();


  const [popularPosts, setPopularPosts] = useState<Post[]>([]);

  const categories = useSelector((state: RootState) => state.categories.categories);
  const latestPosts = useSelector((state: RootState) => state.posts.latestPosts);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchLatestPosts ());
  }, [dispatch]);

  useEffect(() => {
    if (latestPosts.length > 0) {
      const shuffled = [...latestPosts].sort(() => 0.5 - Math.random());
      setPopularPosts(shuffled.slice(0, 5));
    }
  }, [latestPosts]);

 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full lg:w-[320px] bg-slate-200/60 border-2 border-slate-200 p-10 rounded-xl flex flex-col gap-4">
    
        <div className="px-4 py-1 border-gray-700">
          <h5
            className="relative inline-block text-3xl mb-4 pl-3
            bg-linear-to-r from-orange-400 to-orange-600
            text-transparent bg-clip-text
            after:content-[''] after:absolute after:left-0 
            after:-bottom-1.5 after:h-1 after:w-[50%] after:bg-orange-600"
          >
            Categories
          </h5>
        </div>
        <div className="flex flex-col gap-4 ">
          {categories
            .filter(category => !["other"].includes(category.category_name.toLowerCase()))
            .map((item: Category) => (
              <Link href={`/category/${item.category_slug}`}
                key={item.category_slug}

                className={` px-4 py-3 border border-slate-300 text-slate-600 rounded-xl text-center transition-all text-sm 
                }`}
              >
                {item.category_name}
              </Link>
            ))}
        </div>
      

    
        
     
    </div>
  );
};

export default CategorySidebar;
