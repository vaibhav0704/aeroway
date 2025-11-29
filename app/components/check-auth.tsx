"use client"
import { useEffect } from "react";
import axios from "axios";

const CheckAuth = () => {

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/checkauth`, { withCredentials: true })
      .then((res) => {
        console.log("CheckAuth Response:", res.data);
      })
      .catch((err) => {
        console.log("CheckAuth Error:", err);
      });
  }, []);

  return (
    <div className="p-5 text-white">
      <h1>CheckAuth Component Loaded</h1>
      <p>Open console to see API response.</p>
    </div>
  );
};

export default CheckAuth;
