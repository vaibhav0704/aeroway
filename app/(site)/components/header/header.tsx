"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();  
  const user = useSelector((state: RootState) => state.auth);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpenSearch(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    router.push(`/search?discover=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setOpenSearch(false);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "GET", credentials: "include" });
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

        <button className="lg:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>

        <ul
          className={`lg:flex gap-10 text-[#4e658a] font-medium absolute lg:static 
            bg-white lg:bg-transparent w-full left-0 lg:w-auto px-6 py-6 lg:p-0
            transition-all duration-300 shadow-md lg:shadow-none 
            ${open ? "top-16" : "top-[-420px]"}`}
        >
          {["/", "publications", "about-us", "contact-us"].map((path) => (
            <li key={path}>
              <Link
                href={`/${path}`}
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
        </ul>

        <div className="hidden lg:flex relative items-center gap-4">
          <div ref={searchRef} className="relative">
            <FiSearch
              className="cursor-pointer text-2xl hover:text-gray-600"
              onClick={() => setOpenSearch(true)}
            />

            {openSearch && (
              <div className="absolute right-0 top-12 bg-white p-4 rounded-md shadow-lg w-96 flex items-center gap-2 z-50">
                <input
                  type="text"
                  placeholder="Type your search..."
                  className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Search
                </button>
              </div>
            )}
          </div>

          <div ref={userMenuRef} className="relative">
            {user?.isAuthenticated ? (
              <>
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
              </>
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
      </div>

      {open && (
        <div className="lg:hidden flex justify-center gap-10 py-4 border-t text-2xl bg-white">
          <FiSearch
            className="cursor-pointer hover:text-blue-600"
            onClick={() => setOpenSearch(true)}
          />
        </div>
      )}
    </nav>
  );
}
