"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Profile = () => {
  const fullData = useSelector((state: RootState) => state.auth);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" p-6 max-w-3xl mx-auto">
        <p className="text-2xl font-semibold mb-4">Profile Details</p>
        <hr className="mb-4" />
        <table className="w-full text-left text-lg border-[rgb(245,245,245)] border-collapse">
          <tbody>
            <tr className="border-b-2  border-[rgb(245,245,245)]">
              <th className="py-2 px-4 bg-[rgb(245,245,245)]  font-bold">Profile</th>
              <td className="py-2 px-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden">
                    <Image
                      src={
                        fullData.profile
                          ? fullData.profile
                          : "https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/cropped-cropped-Aeroway-one-favicon.png"
                      }
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium">{fullData.name}</p>
                </div>
              </td>
            </tr>
            <tr className="border-b-2 border-[rgb(245,245,245)]">
              <th className="py-2 bg-[rgb(245,245,245)] px-4 font-bold">About</th>
              <td className="py-2 px-4">{fullData.bio}</td>
            </tr>
            <tr className="border-b-2  border-[rgb(245,245,245)]">
              <th className="py-2 bg-[rgb(245,245,245)] px-4 font-bold">Profession</th>
              <td className="py-2 px-4">{fullData.profession}</td>
            </tr>
            <tr className="border-b-2 border-[rgb(245,245,245)]">
              <th className="py-2 bg-[rgb(245,245,245)] px-4 font-bold">Username</th>
              <td className="py-2 px-4">{fullData.username}</td>
            </tr>
            <tr className="border-b-2 border-[rgb(245,245,245)]" >
              <th className="py-2 bg-[rgb(245,245,245)] px-4 font-bold">Email</th>
              <td className="py-2 px-4">{fullData.email}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 flex justify-end">
          <Link
            href="/edit-profile"
            className="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-400 text-white rounded-lg hover:from-orange-400 hover:to-orange-700 shadow-md transition-transform duration-300 ease-in-out"
            onClick={scrollToTop}
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
