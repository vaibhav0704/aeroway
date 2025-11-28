import Image from "next/image";  // <-- REQUIRED IMPORT

type PopularPostProps = {
  img: string;
  text: string;
  date: string;
};

const PopularPostCard = ({ img, text, date }: PopularPostProps) => {
  return (
    <div className="flex items-center gap-3 p-3  rounded-lg shadow-sm  w-full max-w-sm">
      
      {/* ROUNDED IMAGE */}
      <Image
        src={img}
        alt="post image"
        width={60}
        height={60}
        className="rounded-full h-16 w-16 object-cover"
      />

      {/* TEXT + DATE */}
      <div>
        <p className="text-gray-800 text-sm font-medium">{text}</p>
        <p className="text-gray-500 text-xs mt-1">{date}</p>
      </div>
    </div>
  );
};

export default PopularPostCard;
