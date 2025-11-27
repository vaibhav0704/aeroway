"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT - LOGO */}
        <Link href="/">
          <Image
            src="/" // place logo inside public/logo.png
            width={80}
            height={40}
            alt="Logo"
            className="cursor-pointer"
          />
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        {/* CENTER MENU */}
        <ul className={`lg:flex gap-10 text-gray-700 font-medium absolute lg:static bg-white w-full left-0 
          lg:w-auto px-6 py-6 lg:p-0 transition-all duration-300 shadow-md lg:shadow-none 
          ${open ? "top-16" : "top-[-400px]"}`}>
          
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/publications" className="hover:text-blue-600">Publications</Link></li>
          <li><Link href="/about-us" className="hover:text-blue-600">About Us</Link></li>
          <li><Link href="/contact-us" className="hover:text-blue-600">Contact Us</Link></li>

        </ul>

        {/* RIGHT ICONS */}
        <div className="hidden lg:flex items-center gap-5 text-2xl">
          <FiSearch className="cursor-pointer hover:text-blue-600" />
          <FiUser className="cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      {/* MOBILE ICONS */}
      {open && (
        <div className="lg:hidden flex justify-center gap-10 py-4 border-t text-2xl">
          <FiSearch className="cursor-pointer hover:text-blue-600" />
          <FiUser className="cursor-pointer hover:text-blue-600" />
        </div>
      )}
    </nav>
  );
}
