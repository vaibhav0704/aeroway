"use client";

import type { RootState } from "@/redux/store";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoughnutChart from "./doughnut";
import LineChart from "./line-chart";
import QuizAnalytics from "./quiz-analytics";

interface AnalyticResponse {
  dailyResults?: any[];
  totalResult?: number[];
}

interface Props {
  analyticUpdate?: number;
}

export default function YourMove({ analyticUpdate }: Props) {
  const auth = useSelector((state: RootState) => state.auth);
  const [analytic, setAnalytic] = useState<AnalyticResponse>({});
  const [totalResult, setTotalResult] = useState<number[]>([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await axios.get<AnalyticResponse>(
          `/api/quiz/get-quiz-analytic/${auth.userId}`,
          { withCredentials: true }
        );
        setTotalResult(res.data?.totalResult || []);
        setAnalytic(res.data || {});
      } catch (err) {
        console.error("Error fetching quiz data:", err);
      }
    };
    if (auth.userId) fetchQuizData();
  }, [auth.userId, analyticUpdate]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="container max-w-full sm:max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
      
      {!auth.userId && (
        <div className="absolute left-0 right-0 m-40 flex items-center justify-center z-10 px-2">
          <div className="bg-white p-4 xs:p-6 sm:p-6 rounded-lg shadow max-w-xs sm:max-w-sm text-center">
            <h2 className="text-base xs:text-lg sm:text-xl font-bold mb-2">You need to log in to view this content</h2>
            <Link href="/login">
              <button
                onClick={scrollToTop}
                className="mt-3 px-4 py-2 sm:px-5 sm:py-3 bg-linear-to-r from-orange-600 to-orange-300 text-white rounded text-sm sm:text-base"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 pt-10 sm:pt-12">
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-base xs:text-lg sm:text-xl font-bold">Hi {auth.name},</h2>
          <h4 className="text-base xs:text-lg sm:text-xl font-bold">Welcome to Dashboard</h4>
          <div className="mt-4">
            <QuizAnalytics analyticUpdate={analyticUpdate} />
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="w-full mt-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Current Month Analytics */}
        <div className="p-2 sm:p-4 lg:w-2/3 ">
          <h2 className="text-base xs:text-lg sm:text-xl font-bold mb-2 sm:mb-3">Current Month Analytics</h2>
          <div className="w-full h-64 sm:h-80 md:h-96">
            {analytic?.dailyResults && <LineChart dailyResults={analytic.dailyResults} />}
          </div>
        </div>

        {/* Overall Doughnut */}
        <div className="p-2 sm:p-4 lg:w-1/3 bg-gray-100 rounded relative shadow min-h-[280px]">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <h2 className="text-base xs:text-lg sm:text-xl font-bold">Overall</h2>
            <Link href="/all-quiz-analytics" className="text-sm sm:text-base">
              <button className="px-2 sm:px-3 py-1 sm:py-2 bg-sky-200 text-sky-800 rounded text-xs sm:text-sm">View</button>
            </Link>
          </div>

          <div className="w-full h-64 sm:h-80 md:h-96 relative">
            {analytic?.totalResult && <DoughnutChart data={totalResult} />}
          </div>
        </div>
      </div>
    </div>
  );
}
