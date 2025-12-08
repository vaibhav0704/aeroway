"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Intro = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full justify-center grid lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="https://aeroway.s3-eu-central-2.ionoscloud.com/What-we-offer-768x512.webp"
            alt="our mission"
            width={600}
            height={470}
            className="w-full rounded"
          />
        </motion.div>

        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center"
        >
          <h2
            className="text-4xl mb-4
             bg-linear-to-r from-orange-600 via-orange-300 to-orange-400
             text-transparent bg-clip-text"
          >
            What We Offer
          </h2>
          <p className="text-justify text-[#66768f] font-semibold opacity-70">
            Welcome to Aeroway.one, the cosmos where the marvels of aviation meet
            the wonders of outer space. Founded by Mr. Sitanshu Srivastava,
            Aeroway.one is not just a platform; it is a journey that began with a
            simple yet profound vision: bridging the vast expanses of space and
            aviation to the curious and enthusiastic minds of today.
          </p>
        </motion.div>
      </div>

      <div className="w-full grid lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <h2
            className="text-4xl mb-4
             bg-linear-to-r from-orange-600 via-orange-300 to-orange-400
             text-transparent bg-clip-text"
          >
            Our Founder:
            <br />
            Mr. Sitanshu Srivastava
          </h2>
          <p className="text-base text-justify text-[#66768f] font-semibold opacity-70 mb-5">
            Welcome to Aeroway.one, the cosmos where the marvels of aviation meet
            the wonders of outer space. Founded by Mr. Sitanshu Srivastava,
            Aeroway.one is not just a platform; it is a journey that began with a
            simple yet profound vision: bridging the vast expanses of space and
            aviation to the curious and enthusiastic minds of today.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="flex lg:justify-end"
        >
          <Image
            src="https://aeroway.s3-eu-central-2.ionoscloud.com/aeroway_sitanshu_founder.png"
            alt="our founder"
            width={600}
            height={470}
            className="w-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
