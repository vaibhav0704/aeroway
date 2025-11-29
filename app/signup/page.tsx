"use client";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
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

        {/* Right Signup Content */}
        <div className="flex items-center justify-center w-full lg:w-1/2 p-6 lg:p-10">
          <div className="w-full max-w-md">

            <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Create Your Account
            </h1>

            <form className="space-y-4">

              {/* First & Last Name */}
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter First Name"
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter Last Name"
                />
              </div>

              {/* Username & Email */}
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter Username"
                />
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter Email"
                />
              </div>

              {/* Password & Confirm Password */}
              <div className="flex flex-col lg:flex-row justify-between gap-3">
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter Password"
                />
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-4 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Confirm Password"
                />
              </div>

              {/* Accept Terms */}
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
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

              {/* Signup Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full lg:w-[70%] bg-linear-90 from-orange-700 via-orange-500 to-orange-200 text-white py-1 rounded-md cursor-pointer font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition"
                >
                  Sign Up
                </button>
              </div>

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
