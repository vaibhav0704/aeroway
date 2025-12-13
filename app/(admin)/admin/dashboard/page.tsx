"use client";

import { fetchBlogs } from "@/redux/slices/blogSlice";
import { fetchMagazines } from "@/redux/slices/magazineSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "./components/bread-crumb";
import CardDataStats from "./components/card-data-Stats";
import TableOne from "./components/table";


export default function Dashboard() {

  const dispatch=useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blogs.blogs || []);
  const magazines = useSelector((state: RootState) => state.magazines.magazines || []);
  const stats = [
    { title: "Total Blogs", total: blogs.length, icon: "fa-brands fa-blogger-b" },
    { title: "Total Magazines", total: magazines.length, icon: "fa-regular fa-newspaper" },
    { title: "Total Stories", total: 0, icon: "fa fa-history" },
  ];
    useEffect(() => {
      dispatch(fetchBlogs());
      dispatch(fetchMagazines())
    }, [dispatch]);
  
      

  return (
    <div className="  px-4 xl:px-20 flex flex-col gap-6 pt-6 min-h-screen">
      <Breadcrumb />
    
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <CardDataStats title={stat.title} total={stat.total}>
              <i className={`${stat.icon} text-xl text-primary`}></i>
            </CardDataStats>
          </motion.div>
        ))}
      </div>

    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className=""
      >
        <TableOne />
      </motion.div>
    </div>
  );
}
