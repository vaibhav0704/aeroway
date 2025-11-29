"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, values)
      .then((res) => {
        
        if (res.data.success) {
           console.log("Hello");
          if (typeof window !== "undefined") {
            if (rememberMe) {
             
              localStorage.setItem("token", res.data.token);
            } else {
              sessionStorage.setItem("token", res.data.token);
            }
          }
          console.log(res.data.token)
          router.push("/");
        } else {
          setErrors(res.data.Error);
        }
      })
      .catch(() => {
        setErrors("Something went wrong");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-xl shadow-black/40 rounded-xl overflow-hidden flex flex-col lg:flex-row w-full max-w-4xl">
        <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
          <Image
            src="https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/young-asian-businesswoman-reading-an-e-mail-on-lap-2024-12-13-17-48-24-utc.jpg"
            alt="Login Image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center justify-center w-full lg:w-1/2 p-6 lg:p-10">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Sign in to your account
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex justify-center">
                <input
                  type="text"
                  name="emailOrUsername"
                  value={values.emailOrUsername}
                  onChange={handleInput}
                  className="w-full border lg:w-[70%] border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter email or username"
                />
              </div>

              <div className="flex justify-center">
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  className="w-full border lg:w-[70%] border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter password"
                />
              </div>

              {errors && (
                <p className="text-center text-red-600 text-sm">{errors}</p>
              )}

              <div className="flex justify-end">
                <a className="text-sm text-blue-600 hover:underline cursor-pointer">
                  Forgot Password?
                </a>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="text-sm text-gray-700">Remember Me</span>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full lg:w-[70%] bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white py-2 rounded-md cursor-pointer font-semibold shadow-md active:scale-95 transition"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="text-center mt-8 text-gray-700 text-sm">
              Sign Up If You Haven't Account?
              <Link
                href="/signup"
                className="ml-1 text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
