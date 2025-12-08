"use client";
import Image from "next/image";

type InfoCardProps = {
  text: string;
  date: string;
  onReadMore?: () => void;
};

const InfoCard = ({ text, date, onReadMore }: InfoCardProps) => {
  return (
    <div className="bg-slate-200/60 shadow-md  p-5 
      w-full max-w-sm mx-auto border border-gray-200">

      <p className="text-gray-800 mb-4 text-sm">{text}</p>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Image
            src={"/images/fevicon.png"}
            alt="icon"
            width={50}
            height={50}
            className="object-cover "
          />
          <span className="text-gray-700 font-medium">{date}</span>
        </div>

        <button
          onClick={onReadMore}
          className=" font-medium transition"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
