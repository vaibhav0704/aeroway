import Head from "next/head";
import AboutContact from "./about-contact";
import Hero from "./hero";
import Intro from "./intro";
import OurMission from "./our-mission";

export default function Aboutus() {
  return (
    <>
      <Head>
        <title>About Us | Aeroway.one</title>
        <meta
          name="description"
          content=" Explore the limitless world of aviation and space, where aerospace knowledge meets innovation, curiosity, and inspiring journeys."
        />
        <meta
          name="keywords"
          content="About Us, Aviation and Space Exploration, Aerospace Knowledge, Innovation in Aviation, Inspiring Aerospace Journeys, Aviation History, Space Exploration Insights"
        />
        <meta property="og:title" content="About Us | Aeroway.one" />
        <meta
          property="og:description"
          content=" Explore the limitless world of aviation and space, where aerospace knowledge meets innovation, curiosity, and inspiring journeys."
        />
      </Head>
      <div className="w-full max-w-screen overflow-hidden p-4 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-screen overflow-hidden flex flex-col gap-10 xl:w-[85%]">
              <Hero />
              <OurMission />
              <Intro/>
              <AboutContact />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
