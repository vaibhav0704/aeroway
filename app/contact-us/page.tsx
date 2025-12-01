"use client";

import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { SlLocationPin } from "react-icons/sl";
import { TiArrowRightThick } from "react-icons/ti";
import { motion } from "framer-motion";

export default function ContactPage() {
  const serverUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Phone must be 10 digits.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);

        const response = await axios.post(
          `${serverUrl}/contact/addcontact`,
          formData
        );

        if (response.status === 200) {
          alert("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            number: "",
            subject: "",
            message: "",
          });
        }
      } catch (error) {
        if (error.response?.status === 400) {
          alert(error.response.data.message);
        } else {
          alert("Failed to send message. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Aeroway.one</title>
        <meta
          name="description"
          content="Join Aeroway.one for aviation and space insights."
        />
        <meta name="keywords" content="Contact Us, Aeroway.one" />
        <meta property="og:title" content="Contact Us | Aeroway.one" />
      </Head>

      <div className="w-full py-16 px-4 md:px-10 lg:px-20 lg:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl mb-4
            bg-linear-to-r from-orange-800 via-orange-500 to-orange-100
            text-transparent bg-clip-text"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-justify"
          >
            Aeroway.One is an exciting website dedicated to aviation and space
            enthusiasts. Dive into a captivating collection of articles,
            informative features, and thought-provoking insights. Explore a
            variety of topics, including aviation history, aircraft reviews,
            updates on space exploration, pilot anecdotes, and much more.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl mx-auto text-lg flex flex-col md:flex-row mt-10 text-center justify-center items-center gap-6"
        >
          <a
            href="tel:+17863712232"
            className="text-[#336efd] flex items-center gap-2 hover:text-blue-300 leading-none"
          >
            <TfiHeadphoneAlt size={36} />
            +1-786-371-2232
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=30+N+Gould+St+%2324999,+Sheridan,+WY+82801"
            target="_blank"
            rel="noreferrer"
            className="text-[#336efd] flex items-center gap-2 hover:text-blue-300 leading-none"
          >
            <SlLocationPin size={36} />
            30 N Gould St #24999, Sheridan, WY 82801
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="max-w-4xl mx-auto mt-14 p-8"
        >
          <h3
            className="text-4xl mb-4
            bg-linear-to-r from-orange-600 via-orange-400 to-orange-100
            text-transparent bg-clip-text text-center"
          >
            Drop Us a Line
          </h3>
          <p className="text-gray-400 text-center mb-8">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <motion.form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter your name *"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-slate-200 rounded-lg outline-none placeholder-gray-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="email"
                placeholder="Enter your email *"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-200 outline-none placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 bg-slate-200 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="number"
                placeholder="Enter your phone number *"
                value={formData.number}
                onChange={handleChange}
                className="w-full p-3 bg-slate-200 rounded-lg outline-none placeholder-gray-400"
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 bg-slate-200 rounded-lg outline-none placeholder-gray-400"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <textarea
                name="message"
                placeholder="Message *"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 rounded-lg bg-slate-200 outline-none placeholder-gray-400"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="md:col-span-2 text-center">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 inline-flex text-sm items-center gap-1 py-2 text-white mb-4 pl-3
                bg-linear-to-r from-orange-600 to-orange-300 rounded-md cursor-pointer
                transition"
              >
                {loading ? "Sending..." : "Send Message"}
                <TiArrowRightThick />
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}
