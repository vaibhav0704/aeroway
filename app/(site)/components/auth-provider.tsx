"use client";

import { saveLoggedInUser } from "@/redux/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveLoggedInUser() as any);
  }, [dispatch]);

  return <>{children}</>;
}
