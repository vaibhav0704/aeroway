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


  const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1).filter(day => day % 2 !== 0);

  const correctCountsAll: number[] = Array.from({ length: daysInMonth }, () => 0);
  const wrongCountsAll: number[] = Array.from({ length: daysInMonth }, () => 0);

  dailyResults.forEach((result) => {
    const dayIndex = result.day - 1;
    correctCountsAll[dayIndex] = Number(result.correct_count);
    wrongCountsAll[dayIndex] = Number(result.wrong_count);
  });

  const correctCounts = labels.map(day => correctCountsAll[day - 1]);
  const wrongCounts = labels.map(day => wrongCountsAll[day - 1]);

  const data = {
    labels,
    datasets: [
      {
        label: "Correct Answers",
        data: correctCounts,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#d66d27",
      },
      {
        label: "Wrong Answers",
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
