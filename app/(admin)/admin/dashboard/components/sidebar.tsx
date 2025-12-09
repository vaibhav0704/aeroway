'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { FiGrid } from 'react-icons/fi';
import { FaLayerGroup, FaRegNewspaper, FaBookOpen, FaBloggerB } from 'react-icons/fa6';
import { MdOutlineClose, MdOutlineWebStories } from 'react-icons/md';
import { CiSettings } from "react-icons/ci";
import { LuUser, LuNotepadText } from "react-icons/lu";
import { BsGrid3X2GapFill } from "react-icons/bs";

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

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <>
     
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0  z-90 bg-black/40 lg:hidden backdrop-blur-sm"
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
        className="fixed left-0 top-0 z-999 h-screen w-72 bg-white shadow-xl dark:bg-[#1f1f23] lg:static lg:translate-x-0"
      >
        
        <div className="flex items-center justify-between px-6 lg:mt-10 py-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="shrink-0 w-60 h-10 ">
            <Image
              src="https://aeroway.s3-eu-central-2.ionoscloud.com/cropped-Aeroway-mob-logo-retina-1 (2).png"
              alt="Logo"
              width={400}
              height={400}
              className="object-cover h-10 w-60"
            />
          </Link>

          <button
            className="lg:hidden absolute top-10"
            onClick={() => setSidebarOpen(false)}
          >
            <MdOutlineClose className="w-7 h-7 text-gray-800 dark:text-white" />
          </button>
        </div>

      
        <div className="overflow-y-auto h-full px-4 py-6 space-y-6">
          {menuItems.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 mb-3 tracking-wider">
                {group.heading}
              </h3>

              <ul className="space-y-1">
                {group.links.map(({ href, label, Icon }) => {
                  const active = isLinkActive(href);
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                       href={`/admin/dashboard${href}`}
                        onClick={() => {
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className={`
                            flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer 
                            transition-all duration-300
                            ${active
                              ? 'bg-orange-500 text-white shadow-md'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }
                          `}
                        >
                          <motion.span whileHover={{ rotate: 5 }}>
                            <Icon className="w-5 h-5" />
                          </motion.span>

                          <span className="text-sm font-medium">{label}</span>
                        </motion.div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </motion.aside>
    </>
  );
}
