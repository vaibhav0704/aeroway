import Head from "next/head";
import AboutContact from "./about-contact";
import Hero from "./hero";
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
      <div className="w-full p-4 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col gap-10 xl:w-[85%]">
              <Hero />
              <OurMission />
              <div className="w-full justify-center grid lg:grid-cols-2 gap-10 ">
                <div>
                  <img
                    src="https://aeroway.s3-eu-central-2.ionoscloud.com/What-we-offer-768x512.webp"
                    alt="our mission"
                    className="w-full rounded"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2
                    className="text-4xl mb-4
             bg-linear-to-r from-orange-600 via-orange-300 to-orange-400
             text-transparent bg-clip-text"
                  >
                    What We Offer
                  </h2>
                  <p className="  text-justify text-[#66768f] font-semibold opacity-70">
                    Welcome to Aeroway.one, the cosmos where the marvels of
                    aviation meet the wonders of outer space. Founded by Mr.
                    Sitanshu Srivastava, Aeroway.one is not just a platform; it
                    is a journey that began with a simple yet profound vision:
                    bridging the vast expanses of space and aviation to the
                    curious and enthusiastic minds of today.
                  </p>
                </div>
              </div>
              <div className="w-full grid lg:grid-cols-2 gap-10">
                <div>
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
                    Welcome to Aeroway.one, the cosmos where the marvels of
                    aviation meet the wonders of outer space. Founded by Mr.
                    Sitanshu Srivastava, Aeroway.one is not just a platform; it
                    is a journey that began with a simple yet profound vision:
                    bridging the vast expanses of space and aviation to the
                    curious and enthusiastic minds of today.
                  </p>
                </div>
                <div className="flex justify-end">
                  <img
                    src="https://aeroway.s3-eu-central-2.ionoscloud.com/aeroway_sitanshu_founder.png"
                    alt="our founder"
                    className="w-[80%] max-w-md"
                  />
                </div>
              </div>
              <AboutContact />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
