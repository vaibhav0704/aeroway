"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { saveLoggedInUser } from "@/redux/action";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  // Get user from Redux
  const user = useSelector((state: RootState) => state.auth);

  // Fetch logged-in user on page load
  useEffect(() => {
    dispatch(saveLoggedInUser());
  }, [dispatch]);

  return (
    <nav className="w-full bg-[#f9fbff] sticky top-0 z-50 px-6 2xl:px-96">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

  
        <Link href="/">
          <Image
            src="/images/logo.png"
            height={80}
            width={200}
            alt="Logo"
            className="cursor-pointer"
          />
        </Link>

        {/* Mobile Menu Icon */}
        <button className="lg:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>

        {/* Nav Menu */}
        <ul
          className={`lg:flex gap-10 text-[#4e658a] font-medium absolute lg:static 
          bg-white lg:bg-transparent w-full left-0 lg:w-auto px-6 py-6 lg:p-0
          transition-all duration-300 shadow-md lg:shadow-none 
          ${open ? "top-16" : "top-[-420px]"}`}
        >
          <li>
            <Link
              onClick={() => setOpen(false)}
              href="/"
              className={`hover:text-[#4e658a] block py-2 ${pathname === "/" ? "text-[#4e658a] font-semibold" : ""}`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              onClick={() => setOpen(false)}
              href="/publications"
              className={`hover:text-[#4e658a] block py-2 ${pathname === "/publications" ? "text-[#4e658a] font-semibold" : ""}`}
            >
              Publications
            </Link>
          </li>

          <li>
            <Link
              onClick={() => setOpen(false)}
              href="/about-us"
              className={`hover:text-[#4e658a] block py-2 ${pathname === "/about-us" ? "text-[#4e658a] font-semibold" : ""}`}
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              onClick={() => setOpen(false)}
              href="/contact-us"
              className={`hover:text-[#4e658a] block py-2 ${pathname === "/contact-us" ? "text-[#4e658a] font-semibold" : ""}`}
            >
              Contact Us
            </Link>
          </li>

          {/* Mobile Login/Profile */}
          <div className="lg:hidden mt-4 flex justify-center">
            {user?.isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center gap-3 px-6 py-2 bg-gray-200 rounded-md"
              >
                <Image
                  src={user.profile || "/images/default-user.png"}
                  alt="Profile"
                  width={35}
                  height={35}
                  className="rounded-full object-cover"
                />
                <span>{user.name}</span>
              </Link>
            ) : (
              <Link
                onClick={() => setOpen(false)}
                href="/login"
                className="px-6 py-2 text-white font-bold bg-linear-to-r from-orange-600 to-orange-300 rounded-md w-full text-center"
              >
                Login
              </Link>
            )}
          </div>
        </ul>

        {/* Desktop Login/Profile */}
        <div className="hidden lg:flex">
          {user?.isAuthenticated ? (
            <Link href="/profile" className="flex items-center gap-3">
              <Image
                src={user.profile || "https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/cropped-cropped-Aeroway-one-favicon.png"}
                alt="Profile"
                width={45}
                height={45}
                className="rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2 text-white font-bold bg-linear-to-r from-orange-600 to-orange-300 rounded-md transition"
            >
              Log in
            </Link>
          )}
        </div>
      </div>

      {open && (
        <div className="lg:hidden flex justify-center gap-10 py-4 border-t text-2xl bg-white">
          <FiSearch className="cursor-pointer hover:text-blue-600" />
          <FiUser className="cursor-pointer hover:text-blue-600" />
        </div>
      )}
    </nav>
  );
}
