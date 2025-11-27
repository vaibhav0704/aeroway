"use client";

import Image from "next/image";

export default function RandomGrid() {
  const items = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
  }));

  return (
    <div>
        <div className="text-center">
            <p>Explore within...</p>
            <p>AVIATION SPACE</p>
        </div>
       
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-400 text-white rounded-xl p-3 gap-3 shadow-md hover:scale-[1.03] transition-all"
          >
            {/* IMAGE */}
            <div className="relative w-12 h-12">
              <Image
                src="/dummy.svg" 
                alt="dummy"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* TEXT */}
            <p className="text-sm font-semibold whitespace-nowrap">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
