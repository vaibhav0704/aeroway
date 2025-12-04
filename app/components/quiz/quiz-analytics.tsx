"use client";

import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface AnalyticsItem {
  period?: string;
  correct_count: number;
  wrong_count: number;
  total_count: number;
  correct_percentage: number;
}

interface AnalyticsState {
  currentDay: AnalyticsItem[];
  currentWeek: AnalyticsItem[];
  currentMonth: AnalyticsItem[];
  currentYear: AnalyticsItem[];
}

interface Props {
  analyticUpdate?: number;
}

export default function QuizAnalytics({ analyticUpdate }: Props) {
  const [analytics, setAnalytics] = useState<AnalyticsState>({
    currentDay: [],
    currentWeek: [],
    currentMonth: [],
    currentYear: [],
  });
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!auth.userId) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await axios.get<AnalyticsState>(
          `/api/quiz/current-quiz-analysis/${auth.userId}`,
          { withCredentials: true }
        );
      
        setAnalytics(res.data || {
          currentDay: [],
          currentWeek: [],
          currentMonth: [],
          currentYear: [],
        });
      } catch (err) {
        console.error("Error fetching quiz analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [auth.userId, analyticUpdate]);

  const renderAnalytics = (data: AnalyticsItem, title: string) => {
    const correctPercentage =  Number(data?.correct_percentage || 0);

    return (
      <div className="p-4 lg:p-8 bg-gray-100 rounded  w-fit ">
        <div className="flex justify-between gap-4 items-center mb-2">
          <p className=" inline-block">{title}</p>
          <p className="bg-sky-200 text-sky-800 px-2 py-0.5 rounded-md text-sm">Analytics</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-gray-800">
            <IoMdCheckmark color="#15803d" /> Correct: {data.correct_count}
          </span>
          <span className="flex items-center gap-2 text-gray-800">
            <RxCross2 color="#e63946" /> Incorrect: {data.wrong_count}
          </span>
          <span className="flex items-center gap-2 text-gray-800">Total: {data.total_count}</span>
          <span className="flex items-center gap-2 text-gray-800">
            Percentage: {correctPercentage.toFixed(2)}%
          </span>
        </div>
      </div>
    );
  };

  if (!auth.userId) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        Please login to view analytics.
      </div>
    );
  }

  if (loading) {
    return <div className="p-4">Loading analytics...</div>;
  }

  return (
    <div className="mt-4 flex gap-3 flex-wrap">
      {analytics.currentDay.length > 0 && renderAnalytics(analytics.currentDay[0], "Current Day")}
      {analytics.currentWeek.length > 0 && renderAnalytics(analytics.currentWeek[0], "Current Week")}
      {analytics.currentMonth.length > 0 && renderAnalytics(analytics.currentMonth[0], "Current Month")}
      {analytics.currentYear.length > 0 && renderAnalytics(analytics.currentYear[0], "Current Year")}
    </div>
  );
}
