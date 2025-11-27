"use client";
import Image from "next/image";

type InfoCardProps = {
  text: string;
  icon: string;       // image path
  date: string;
  onReadMore?: () => void;
};

const InfoCard = ({ text, icon, date, onReadMore }: InfoCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 
      w-full max-w-sm mx-auto border border-gray-200">

      {/* TEXT */}
      <p className="text-gray-800 mb-4 text-sm">
        {text}
      </p>

      {/* BOTTOM SECTION */}
      <div className="flex items-center justify-between text-sm text-gray-600">

        {/* ICON + DATE */}
        <div className="flex items-center gap-2">
          <Image
            src={icon}
            alt="icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <span className="text-gray-700 font-medium">{date}</span>
        </div>

        {/* READ MORE */}
        <button
          onClick={onReadMore}
          className="text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
