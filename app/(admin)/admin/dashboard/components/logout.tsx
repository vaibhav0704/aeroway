"use client";

import { useAppDispatch } from "@/redux/hook";
import { adminLogout } from "@/redux/adminActions";
import { useRouter } from "next/navigation";

export default function Logout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      
      await dispatch(adminLogout());
      router.replace("/admin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 cursor-pointer hover:font-bold w-full text-white rounded"
    >
      Logout
    </button>
  );
}
