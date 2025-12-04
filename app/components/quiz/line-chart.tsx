"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DailyResult {
  day: number;
  correct_count: string | number;
  wrong_count: string | number;
}


interface LineChartProps {
  dailyResults: DailyResult[];
}

const LineChart: React.FC<LineChartProps> = ({ dailyResults }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const correctCounts: number[] = Array.from({ length: daysInMonth }, () => 0);
  const wrongCounts: number[] = Array.from({ length: daysInMonth }, () => 0);

  dailyResults.forEach((result) => {
    const dayIndex = result.day - 1;
    correctCounts[dayIndex] = Number(result.correct_count);
    wrongCounts[dayIndex] = Number(result.wrong_count);
  });

  const data = {
    labels: Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()),
    datasets: [
      {
        label: "Correct Answers",
        data: correctCounts,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#d66d27",
      },
      {
        label: "Wrong Answer",
        data: wrongCounts,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#3853a4",
      },
    ],
  };

  return (
    <div style={{ height: "320px" }}>
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default LineChart;
