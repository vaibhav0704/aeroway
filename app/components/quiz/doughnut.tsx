"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: number[]; 
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const chartData = {
    labels: ["Correct Questions", "Wrong Questions"],
    datasets: [
      {
        label: "# of Questions",
        data: data,
        backgroundColor: ["#d66d27", "#3853a4"],
        hoverOffset: 4,
      },
    ],
  };


  const centerTextPlugin: Plugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      if (!ctx) return;

      ctx.save();

      const total = data.reduce((a, b) => a + b, 0);
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("All Questions", centerX, centerY - 10);

      ctx.font = "bold 20px Arial";
      ctx.fillText(total.toString(), centerX, centerY + 15);

      ctx.restore();
    },
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />;
};

export default DoughnutChart;
