"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaRegUser } from "react-icons/fa";
import { LuMails } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="w-full p-10 lg:p-20 text-[#4e658a] font-bold opacity-75 ">
      <div className="max-w-7xl bg-[#e8edf5] border-2 border-[#c2d4ee] rounded-4xl mx-auto px-6 py-10 lg:p-20 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="transition-transform duration-300 hover:scale-105 no-underline"
          >
            <Image
              src="/images/logo.png"
              height={80}
              width={200}
              alt="Logo"
              className="cursor-pointer"
            />
          </Link>
          <p className="text-sm leading-relaxed text-justify">
            Aeroway.One is an exciting website dedicated to aviation and space
            enthusiasts. Dive into a captivating collection of articles,
            informative features, and thought-provoking insights. Explore a
            variety of topics, including aviation history, aircraft reviews,
            updates on space exploration, pilot anecdotes, and much more.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="no-underline transition-transform duration-300 hover:scale-105"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/publications"
                className="no-underline transition-transform duration-300 hover:scale-105"
              >
                Publications
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="no-underline transition-transform duration-300 hover:scale-105"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="no-underline transition-transform duration-300 hover:scale-105"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Policies</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/privacy-policy"
                className="no-underline transition-transform duration-300 hover:scale-105"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-use"
                className="no-underline transition-transform duration-300 hover:scale-105"
              >
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link
                href="/information-policy"
                className="no-underline transition-transform duration-300 hover:scale-105"
              >
                Information Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex items-center justify-center">
              <Image
                alt="scanner"
                height={120}
                width={190}
                src={"/images/scanner.jpg"}
                className="object-cover bg-white"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-2">Newsletter</h3>
          <div className="inline-flex items-center border-b border-gray-400">
            <LuMails />
            <input
              type="text"
              placeholder="Your Name"
              className="px-3 py-2 rounded-md w-full outline-none border-none focus:outline-none focus:ring-0"
            />
          </div>

          <div className="inline-flex items-center border-b border-gray-400">
            <FaRegUser />
            <input
              type="email"
              placeholder="Your Email"
              className="px-3 py-2 rounded-md w-full outline-none border-none focus:outline-none focus:ring-0"
            />
          </div>

          <button
            className="px-6 py-2  text-white  font-bold mb-4 pl-3
             bg-linear-to-r from-orange-600 via-orange-500 to-orange-300 rounded-md cursor-pointer
             transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className="w-full border-[#c2d4ee] border-t-2 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            Ⓒ 2025 DO IT FOR ME LLC. All Rights Reserved.
          </p>

          <div className="flex gap-5 text-sm font-light ">
            <Link
              href="https://www.facebook.com/aeroway.one/"
              target="_blank"
              className="transition-transform flex items-center gap-1 duration-300 hover:scale-110"
            >
              <FaFacebookF />
              FaceBook
            </Link>

            <Link
              href="https://www.linkedin.com/company/aeroway.one/"
              target="_blank"
              className="transition-transform flex items-center gap-1 duration-300 hover:scale-110"
            >
              <FaLinkedinIn />
              LinkedIn
            </Link>

            <Link
              href="https://www.instagram.com/aeroway.one/"
              target="_blank"
              className="transition-transform flex items-center gap-1 duration-300 hover:scale-110"
            >
              <FaInstagram />
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
