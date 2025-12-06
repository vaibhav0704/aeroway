"use client";

import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FaRegUser } from "react-icons/fa";
import { LuMails } from "react-icons/lu";
import axios from "axios";

const Subscribe = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidName = (e: KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z\s]$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setMessage("Please fill in both fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/contact/subscribe", formData);

      if (res.status === 200) {
        setMessage("Subscribed successfully!");
        setFormData({ name: "", email: "" });
      } else {
        setMessage("Subscription failed. Try again!");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex items-center justify-center">
          <img
            alt="scanner"
            height={120}
            width={190}
            src="/images/scanner.jpg"
            className="object-cover bg-white"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-2">Newsletter</h3>

      <div className="inline-flex items-center border-b border-gray-400">
        <LuMails />
        <input
          type="text"
          name="name"
          value={formData.name}
          onKeyPress={isValidName}
          onChange={handleChange}
          placeholder="Your Name"
          className="px-3 py-2 rounded-md w-full outline-none border-none focus:outline-none focus:ring-0"
        />
      </div>

      <div className="inline-flex items-center border-b border-gray-400">
        <FaRegUser />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="px-3 py-2 rounded-md w-full outline-none border-none focus:outline-none focus:ring-0"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 text-white font-bold mb-4 pl-3
          bg-linear-to-r from-orange-600 via-orange-500 to-orange-300 rounded-md cursor-pointer
          transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Subscribe"}
      </button>

      {message && (
        <p
          className={`text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Subscribe;
