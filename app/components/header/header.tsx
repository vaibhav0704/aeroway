"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const pathname = usePathname();

  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById("userMenu");
      if (menu && !menu.contains(e.target as Node)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    window.location.reload();
  };

  return (
    <nav className="w-full bg-[#f9fbff] sticky top-0 z-50 px-6 2xl:px-96 xl:py-6">
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

        {/* Navigation Items */}
        <ul
          className={`lg:flex gap-10 text-[#4e658a] font-medium absolute lg:static 
            bg-white lg:bg-transparent w-full left-0 lg:w-auto px-6 py-6 lg:p-0
            transition-all duration-300 shadow-md lg:shadow-none 
            ${open ? "top-16" : "top-[-420px]"}
          `}
        >
          {["/", "publications", "about-us", "contact-us"].map((path) => (
            <li key={path}>
              <Link
                href={path}
                onClick={() => setOpen(false)}
                className={`hover:text-[#4e658a] block py-2 ${
                  pathname === (path === "/" ? "/" : `/${path}`)
                    ? "text-[#4e658a] font-semibold"
                    : ""
                }`}
              >
                {path === "/"
                  ? "Home"
                  : path
                      .replace("-", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            </li>
          ))}

          {/* Mobile Profile / Login */}
          <div className="lg:hidden mt-4 flex flex-col items-center gap-3">
            {user?.isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-6 py-2 bg-gray-200 rounded-md w-full justify-center"
                >
                  <Image
                    src={
                      user.profile ||
                      "https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/cropped-cropped-Aeroway-one-favicon.png"
                    }
                    alt="Profile"
                    width={35}
                    height={35}
                    className="rounded-full object-cover"
                  />
                  <span>{user.name}</span>
                </Link>

                {/* 🔴 MOBILE LOGOUT BUTTON ADDED HERE */}
                <button
                  onClick={() => {
                    document.cookie =
                      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    window.location.reload();
                  }}
                  className="px-6 py-2 bg-red-500 text-white rounded-md font-semibold w-full text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-6 py-2 text-white font-bold bg-linear-to-r from-orange-600 to-orange-300 rounded-md w-full text-center"
              >
                Login
              </Link>
            )}
          </div>
        </ul>

        {/* Desktop Profile */}
        <div className="hidden lg:flex relative" id="userMenu">
          {user?.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setOpenUserMenu((prev) => !prev)}
                className="flex items-center gap-3"
              >
                <Image
                  src={
                    user.profile ||
                    "https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/cropped-cropped-Aeroway-one-favicon.png"
                  }
                  alt="Profile"
                  width={45}
                  height={45}
                  className="rounded-full object-cover"
                />
                <h5 className="font-semibold">{user?.name}</h5>
              </button>

              {/* Desktop Dropdown */}
              {openUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => setOpenUserMenu(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/edit-profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => setOpenUserMenu(false)}
                  >
                    Edit Profile
                  </Link>

                  <button
                    onClick={() => handleLogout()}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
