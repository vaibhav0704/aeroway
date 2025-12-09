import Image from 'next/image'
import Link from 'next/link'
import { RiMenu4Line } from "react-icons/ri";
import React from 'react'

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    <div className={`${sidebarOpen ?"hidden":"flex"} bg-white h-fit z-50 fixed  w-full  justify-between items-center p-6 ` } >
        <div>
            <Link href="/" className="shrink-0  ">
            <Image
              src="https://aeroway.s3-eu-central-2.ionoscloud.com/cropped-Aeroway-mob-logo-retina-1 (2).png"
              alt="Logo"
              width={180}
              height={100}
              className="object-cover "
            />
          </Link>
        </div>
         

          <div className='' onClick={()=>{setSidebarOpen(true)}} >
            <RiMenu4Line className=''  size={30} />

          </div>
    </div>
  )
}

export default Navbar