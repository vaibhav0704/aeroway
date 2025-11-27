"use client";

import InfoCard from "./info-card";
import PopularPostCard from "./popular-post-card";

const iconPath = "/icon.png";

// MAIN CARDS
const dummyCards = [
  {
    text: "Understanding the role of automation in modern aerospace systems.",
    date: "Jan 20, 2025",
  },
  {
    text: "The future of AI-driven aircraft design and safety improvements.",
    date: "Jan 21, 2025",
  },
  {
    text: "How space tourism is shaping the next generation of human travel.",
    date: "Jan 22, 2025",
  },
  {
    text: "Why sustainable aviation fuels matter for our planet.",
    date: "Jan 23, 2025",
  },{
    text: "Why sustainable aviation fuels matter for our planet.",
    date: "Jan 23, 2025",
  },{
    text: "Why sustainable aviation fuels matter for our planet.",
    date: "Jan 23, 2025",
  }
];

// POPULAR POSTS
const popularPosts = [
  {
    img: "/card1.jpg",
    text: "Space innovations transforming aviation.",
    date: "Jan 10, 2025",
  },
  {
    img: "/card2.jpg",
    text: "5 technologies powering future aircraft.",
    date: "Jan 12, 2025",
  },
  {
    img: "/card3.jpg",
    text: "AI copilots are becoming real.",
    date: "Jan 15, 2025",
  },
  {
    img: "/card3.jpg",
    text: "AI copilots are becoming real.",
    date: "Jan 15, 2025",
  },{
    img: "/card3.jpg",
    text: "AI copilots are becoming real.",
    date: "Jan 15, 2025",
  },{
    img: "/card3.jpg",
    text: "AI copilots are becoming real.",
    date: "Jan 15, 2025",
  },
  {
    img: "/card3.jpg",
    text: "AI copilots are becoming real.",
    date: "Jan 15, 2025",
  },
];

const Section3 = () => {
  return (
    <div className="p-6 w-full xl:max-w-[70%] flex flex-col lg:flex-row gap-10">

      {/* LEFT SIDE — MAIN INFO CARDS */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-600 pl-3">
          Latest Insights
        </h2>

        {/* ↓ VERY SMALL GAP NOW */}
        <div className="grid md:grid-cols-2 gap-1">
          {dummyCards.map((card, index) => (
            <InfoCard
              key={index}
              text={card.text}
              date={card.date}
              icon={iconPath}
              onReadMore={() => alert(`Read more clicked on card ${index + 1}`)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — POPULAR POSTS */}
      <div className="w-full lg:w-[320px]">
        <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-600 pl-3">
          Popular Posts
        </h2>

        <div className="flex flex-col gap-3">
          {popularPosts.map((post, index) => (
            <PopularPostCard
              key={index}
              img={post.img}
              text={post.text}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
