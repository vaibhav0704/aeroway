"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

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

        <button className="lg:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>

        <ul
          className={`lg:flex gap-10 text-[#4e658a] font-medium absolute lg:static 
          bg-white lg:bg-transparent w-full left-0 lg:w-auto px-6 py-6 lg:p-0
          transition-all duration-300 shadow-md lg:shadow-none 
          ${open ? "top-16" : "top-[-420px]"}`}
        >
          <li>
            <Link onClick={()=>setOpen(false)} href="/" className="hover:text-blue-600 block py-2">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={()=>setOpen(false)} href="/publications" className="hover:text-blue-600 block py-2">
              Publications
            </Link>
          </li>
          <li>
            <Link onClick={()=>setOpen(false)} href="/about-us" className="hover:text-blue-600 block py-2">
              About Us
            </Link>
          </li>
          <li>
            <Link onClick={()=>setOpen(false)} href="/contact-us" className="hover:text-blue-600 block py-2">
              Contact Us
            </Link>
          </li>

        
          <div className="lg:hidden mt-4 flex justify-center">
            <Link
            onClick={()=>setOpen(false)}
              href="/login"
              className="px-6 py-2 text-white font-bold bg-linear-to-r from-orange-600 to-orange-300 rounded-md w-full text-center"
            >
              Login
            </Link>
          </div>
        </ul>

    
        <div className="hidden lg:flex">
          <Link
            href="/login"
            className="px-6 py-2 text-white font-bold bg-linear-to-r from-orange-600 to-orange-300 rounded-md transition"
          >
            Log in
          </Link>
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
