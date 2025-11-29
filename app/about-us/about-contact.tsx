
"use client";
import Link from "next/link";

const AboutContact = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="mb-20 flex flex-col gap-6 pt-10">
      <div className="text-center">
        <h2 className="bg-linear-to-r from-orange-600 via-orange-500 to-orange-100
             text-transparent bg-clip-text text-3xl font-bold">Connect With Us</h2>
      </div>
      <div className=" bg-[#e8edf5] border border-[#c2d4ee]  p-10 rounded-xl max-w-3xl mx-auto">
        <div className="card-testimonials">
          <div className="card-info mb-6">
            <p className="text-[#4e658a] text-justify">As we chart our course through the skies and into the cosmos, we invite you to join us on this enlightening journey. Your curiosity, passion, and dreams are the wind beneath our wings. Connect with us, share your thoughts, and let us soar to new heights together.</p>
          </div>
          <div className="text-center">
            <Link href="/contact-us" onClick={scrollToTop} className="px-6 py-2 bg-linear-to-r from-orange-600 via-orange-500 to-orange-300 text-white rounded-lg font-medium hover:bg-orange-600 transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContact;
