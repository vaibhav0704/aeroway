"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 gap-10 items-end relative">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-4"
      >
        <span className=" font-bold text-[#7e9cc7]">Hello Everyone!</span>

        <h1
          className="text-xl font-bold  bg-linear-to-r from-orange-600 via-orange-200 to-orange-100
             text-transparent bg-clip-text"
        >
          <Typewriter
            options={{
              wrapperClassName: "typewrite color-linear",
              strings: ["Who We Are"],
              cursor: "|",
              cursorClassName: "typewriter-cursor",
              autoStart: true,
              loop: true,
            }}
          />
        </h1>

        <div className="max-w-lg">
          <p className="text-justify text-[#7e9cc7] max-w-md ">
            Welcome to Aeroway.one, the cosmos where the marvels of aviation
            meet the wonders of outer space. Founded by Mr. Sitanshu Srivastava,
            Aeroway.one is not just a platform; it is a journey that began with
            a simple yet profound vision: bridging the vast expanses of space
            and aviation to the curious and enthusiastic minds of today.
          </p>
        </div>
      </motion.div>

      <div className="flex justify-center relative">
        <motion.div
          initial={{ x: 200, y: 200, opacity: 0 }}
          whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="https://aeroway.s3-eu-central-2.ionoscloud.com/About-Image-Home_Page-1-1-2-1-1-1-1.png"
            alt="Aeroway.One About Us"
            width={400}
            height={200}
            loading="lazy"
            className="w-full max-w-md relative z-10"
          />
        </motion.div>

      
        <motion.img
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          src="/images/pattern-3.svg"
          alt="pattern 3"
          className="absolute left-20 bottom-5 w-6"
        />

        <motion.img
          animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          src="/images/pattern-2.svg"
          alt="pattern 2"
          className="absolute right-20 top-16 w-6"
        />

        <motion.img
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          src="/images/pattern-1.svg"
          alt="pattern 3"
          className="absolute left-1/2 -translate-x-1/2 bottom-3 w-6"
        />

        <motion.img
          animate={{ x: [0, 12, 0], y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          src="/images/pattern-4.svg"
          alt="pattern 4"
          className="absolute right-10 bottom-20 w-6"
        />
      </div>
    </div>
  );
};

export default Hero;
