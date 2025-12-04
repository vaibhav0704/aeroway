"use client";

import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import type { RootState } from "@/redux/store";
import QuizAnalytics from "./quiz-analytics";
import LineChart from "./line-chart";
import DoughnutChart from "./doughnut";

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
    <div className="container mx-auto px-4">
      {!auth.userId && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold">You need to log in to view this content</h2>
            <Link href="/login">
              <button onClick={scrollToTop} className="mt-3 px-4 py-2 bg-linear-to-r from-orange-600 to-orange-300 text-white rounded">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="flex gap-3 flex-wrap pt-10 mt-10">
        <div>
          <h2 className="text-lg font-bold">Hi {auth.name},</h2>
          <h4 className="text-lg font-bold">Welcome to Dashboard</h4>
          <QuizAnalytics analyticUpdate={analyticUpdate} />
        </div>
      </div>

      <div className="w-full mt-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="p-4 lg:w-2/3">
            <h2 className="text-lg font-bold">Current Month Analytics</h2>
            <div className="p-4">
              {analytic?.dailyResults && <LineChart dailyResults={analytic.dailyResults} />}
            </div>
          </div>

          <div className="p-4 lg:w-1/3 bg-gray-100 relative rounded">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Overall</h2>
              <Link href="/all-quiz-analytics" className="text-sm">
                <button className="px-3 py-1 bg-sky-200 text-sky-800 rounded">View</button>
              </Link>
            </div>

            <div className=" absolute   z-10 h-64">
              {analytic?.totalResult && <DoughnutChart data={totalResult} />}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
