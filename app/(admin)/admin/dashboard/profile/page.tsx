"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../components/bread-crumb";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { fetchBlogs } from "@/redux/slices/blogSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state: RootState) => state.admin);
  const totalBlogCount = useSelector(
    (state: RootState) => state.blogs.blogs.length
  );

    useEffect(()=>{fetchBlogs},[]);

  if (!admin.isAuthenticated) {
    toast.error("Please Log into Your Account!");
    return (
      <div className="p-4">
        <p className="text-center text-red-500">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:m-10">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
        <div className="relative z-20 h-40 md:h-72 w-full">
          <Image
            src={
              "https://omfg.s3-eu-central-2.ionoscloud.com/omfg-home/Finance-Consulting-Home-Hero.jpg"
            }
            alt="profile cover"
            fill
            className="object-cover object-center rounded-tl-sm rounded-tr-sm"
          />
        </div>

      
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-32 h-40 w-40 rounded-full bg-white/20 p-2 backdrop-blur sm:h-52 sm:w-52 sm:p-3">
            <div className="relative drop-shadow-2 w-full h-full">
              <Image
                src={
                  admin.image ||
                  "https://omfg.s3-eu-central-2.ionoscloud.com/omfg-about/clients/Layer-7.png"
                }
                alt="profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>

          
          <div className="mt-4">
            <h3 className="mb-1.5 text-3xl font-semibold text-black dark:text-white">
              {admin.name || "Admin Name"}
            </h3>
            <p className="font-medium text-lg">{admin.profession || "Admin"}</p>

       
            <div className="mx-auto mt-6 mb-6 grid max-w-28 grid-cols-1 rounded-md shadow-sm shadow-slate-400 py-3 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="grid grid-cols-1 items-center justify-center gap-1 border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {totalBlogCount}
                </span>
                <span className="text-sm">Blog Posts</span>
              </div>
            </div>


            <div className="mx-auto max-w-2xl">
              <h4 className="font-semibold text-black dark:text-white">About Me</h4>
              <p className="mt-4 text-base text-slate-700 opacity-70 dark:text-gray-300">
                {admin.bio ||
                  "Aeroway One is a comprehensive solutions provider dedicated to empowering businesses across a spectrum of industries with tailored web development, SEO marketing, digital marketing, business consulting, IT services etc."}
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
