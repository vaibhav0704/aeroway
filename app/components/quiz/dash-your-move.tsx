"use client";

import React from "react";
import YourMove from "./your-move";


interface Props {
  analyticUpdate?: number;
}

export default function DashYourMove({ analyticUpdate }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 max-w-7xl lg:px-8 " >
        <div>
          <h2 className="bg-clip-text text-4xl text-transparent bg-linear-to-r from-orange-700 via-orange-500 to-orange-300 inline-block font-semibold ">
            Track Your Score
          </h2>
        </div>
        <YourMove analyticUpdate={analyticUpdate} />
      </div>
    </div>
  );
}
