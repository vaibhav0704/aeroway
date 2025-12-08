"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (form.password !== form.confirmPassword) {
      setError("Password and Confirm Password should be same");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        email: form.email,
        username: form.username,
        password: form.password,
        name: `${form.firstName} ${form.lastName}`,
      });

      setSuccess(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-xl shadow-black/40 rounded-xl overflow-hidden flex flex-col lg:flex-row w-full max-w-4xl">

        {/* Left Image */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
          <Image
            src="https://aeroway.s3-eu-central-2.ionoscloud.com/frontend/young-asian-businesswoman-reading-an-e-mail-on-lap-2024-12-13-17-48-24-utc.jpg"
            alt="Signup Image"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Signup Form */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-6 lg:p-10">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Create Your Account
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter First Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter Last Name"
                  required
                />
              </div>

              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter Username"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter Password"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 cursor-pointer"
                  required
                />
                <p className="text-sm text-gray-700">
                  Accept{" "}
                  <Link href="/terms-of-use" className="text-blue-600 hover:underline">
                    Terms of Use
                  </Link>{" "}
                  &{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full lg:w-[70%] bg-linear-90 from-orange-700 via-orange-500 to-orange-200 text-white py-1 rounded-md cursor-pointer font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>

              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
              {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>

            <p className="text-center mt-8 text-gray-700 text-sm">
              Already have an account?
              <Link
                href={"/login"}
                className="ml-1 text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
