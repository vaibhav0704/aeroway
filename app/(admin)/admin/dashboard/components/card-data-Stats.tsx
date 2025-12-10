"use client";

import { ReactNode } from "react";

interface CardDataStatsProps {
  title?: string;
  total?: string | number;
  children?: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title = "Title",
  total = 0,
  children,
}) => {
  return (
    <div className="flex flex-col justify-between p-6 rounded-xl shadow-sm bg-white dark:bg-gray-800">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
        {children}
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{total}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
      </div>
    </div>
  );
};

export default CardDataStats;
