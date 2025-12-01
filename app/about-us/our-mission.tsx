"use client"
import { motion } from "framer-motion";

const OurMission = () => {
  return (
    <>
      <div className="text-center">
        <motion.h2
          className="bg-linear-to-r from-orange-800 via-orange-600 to-orange-200
             text-transparent bg-clip-text text-3xl font-bold mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Our Mission
        </motion.h2>
      </div>
      <motion.div
        className="w-full bg-[#e8edf5] border border-[#c2d4ee] rounded-lg p-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-base text-[#4e658a] text-justify leading-relaxed">
            At Aeroway.one, our mission goes beyond just sharing knowledge.
            While the skies are a vast playground, the galaxies beyond are an
            uncharted territory waiting for us humans to explore. Our goal is to
            educate, enlighten, and ignite passion about the aerospace and
            aviation industries. We bring forth not just the intricate details,
            dynamics, and innovations of these realms, but also dive deep into
            the heartbeats that power them - the jobs, the interviews, and the
            stories of the people who dare to touch the sky and go beyond.
          </p>
        </div>
      </motion.div>
    </>
  );
};
export default OurMission;
