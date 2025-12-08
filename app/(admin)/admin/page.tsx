"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

interface SignInValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const [values, setValues] = useState<SignInValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });
      const data = await res.json();
      if (data.Status === "Success") {
        router.push("/dashboard");
      } else {
        setErrors(data.Error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors("Something went wrong");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://aeroway.s3-eu-central-2.ionoscloud.com/dashboard/close-up-of-white-airplane-model-on-blue-backgroun-2023-11-27-05-35-25-utc%20(1)%20(1)%20(1)_11zon.jpg')",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-12 bg-black/40 p-10 justify-center items-center rounded-lg min-w-[86%] xl:py-40 xl:px-28 ">
          <div className="flex flex-col items-center text-center justify-center lg:text-left space-y-6 flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Visit Aeroway
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white">
              Explore Stories of Space.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
              <Link
                href="https://aeroway.one/"
                className="w-full sm:w-64 py-4 sm:py-6 bg-transparent border-4 border-white text-center text-white text-lg sm:text-2xl font-semibold hover:bg-white hover:text-black transition duration-300"
              >
                Visit Website
              </Link>
              <Link
                href="https://aeroway.one/"
                className="w-full sm:w-64 py-4 sm:py-6 bg-transparent border-4 border-white text-center text-white text-lg sm:text-2xl font-semibold hover:bg-white hover:text-black transition duration-300"
              >
                Visit Blogs
              </Link>
            </div>
            <Link
              href="https://aeroway.one/contact-us"
              className="px-8 sm:px-16 py-3 sm:py-4 bg-white hover:bg-[#45B05F] hover:text-white text-black text-base sm:text-lg font-semibold hover:bg-[#d66d27] transition duration-300"
            >
              Contact us now
            </Link>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md flex-1 ">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    id="email"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d66d27]"
                    placeholder="Enter your email"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                    📧
                  </span>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    id="password"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d66d27]"
                    placeholder="6+ Characters, 1 Capital letter"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                    🔒
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
                <label className="inline-flex items-center mb-2 sm:mb-0">
                  <input type="checkbox" className="form-checkbox text-[#d66d27]" />
                  <span className="ml-2 text-sm text-gray-700">Remember Me</span>
                </label>
                <Link
                  href="/password_reset"
                  className="text-sm text-[#d66d27] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 hover:bg-[#d66d27] text-white font-bold rounded-lg bg-[#3853A4] transition duration-300"
              >
                Sign In
              </button>
              {errors && <p className="text-red-500 mt-2 text-sm">{errors}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
