'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { FiGrid } from 'react-icons/fi';
import { FaLayerGroup, FaRegNewspaper, FaBookOpen, FaBloggerB } from 'react-icons/fa6';
import { MdOutlineClose, MdOutlineWebStories } from 'react-icons/md';
import { CiSettings } from "react-icons/ci";
import { LuUser, LuNotepadText } from "react-icons/lu";
import { BsGrid3X2GapFill } from "react-icons/bs";
import Logout from './logout';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuItems = [
  {
    heading: 'MENU',
    links: [
      { href: '/', label: 'Dashboard', Icon: FiGrid },
      { href: '/add-blog', label: 'Post Blog', Icon: FaBloggerB },
      { href: '/category', label: 'Blog Category', Icon: FaLayerGroup },
      { href: '/blogs', label: 'All Blogs', Icon: BsGrid3X2GapFill },
      { href: '/add-magazine', label: 'Post Magazine', Icon: FaRegNewspaper },
      { href: '/magazines', label: 'All Magazines', Icon: BsGrid3X2GapFill },
      { href: '/create-story', label: 'Create Story', Icon: FaBookOpen },
      { href: '/stories', label: 'All Stories', Icon: MdOutlineWebStories },
      { href: '/common-stories', label: 'Common Stories', Icon: LuNotepadText },
      { href: '/profile', label: 'Profile', Icon: LuUser },
      { href: '/settings', label: 'Settings', Icon: CiSettings },
    ],
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const sidebar = useRef<HTMLDivElement>(null);

  const isLinkActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.includes(href);

  const sidebarVariants: Variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 15 },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.25 },
    },
  };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        ref={sidebar}
        variants={sidebarVariants}
        initial="closed"
        animate={sidebarOpen ? 'open' : 'closed'}
        className="fixed top-0 left-0 z-50 h-screen w-72 bg-white shadow-xl dark:bg-[#1f1f23] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="shrink-0 w-60 h-10">
            <Image
              src="https://aeroway.s3-eu-central-2.ionoscloud.com/cropped-Aeroway-mob-logo-retina-1 (2).png"
              alt="Logo"
              width={400}
              height={400}
              className="object-cover h-10 w-60"
            />
          </Link>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <MdOutlineClose className="w-7 h-7 text-gray-800 dark:text-white" />
          </button>
        </div>

        <div className="px-4 py-6 flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            {menuItems.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 mb-3 tracking-wider">
                  {group.heading}
                </h3>

                <ul className="space-y-1">
                  {group.links.map(({ href, label, Icon }) => {
                    const active = isLinkActive(href);
                    return (
                      <li key={href}>
                        <Link
                          href={`/admin/dashboard${href}`}
                          onClick={() => {
                            if (window.innerWidth < 1024) setSidebarOpen(false);
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300
                              ${active
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                          >
                            <motion.span whileHover={{ rotate: 5 }}>
                              <Icon className="w-5 h-5" />
                            </motion.span>
                            <span className="text-sm font-medium">{label}</span>
                          </motion.div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-20"><Logout /></div>
        </div>
      </motion.aside>
    </>
  );
}
