"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import Link from "next/link";
import type { RootState } from "@/redux/store";

interface QuizData {
  quizId: string;
  choose_option: number;
  created_at: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const AllPlayedQuiz: React.FC = () => {
  const [detailedAnalytics, setDetailedAnalytics] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchDetailedAnalytics = async () => {
      try {
        if (!auth.userId) return;

        const res = await axios.get<QuizData[]>(
          `/api/quiz/get-all-quiz-analytics/${auth.userId}`
        );
        setDetailedAnalytics(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching detailed quiz analytics");
        setLoading(false);
      }
    };

    fetchDetailedAnalytics();
  }, [auth.userId]);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = detailedAnalytics.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(detailedAnalytics.length / questionsPerPage);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderOption = (
    option: string,
    index: number,
    correctAnswer: number,
    choose_option: number
  ) => {
    const selected = index + 1 == choose_option;
    const isCorrectOption = index === correctAnswer;

    return (
      <div
        key={index}
        className={`flex items-center justify-between gap-2 p-2 rounded border
        ${
          isCorrectOption
            ? "bg-[rgb(212,237,218)] border-green-400"
            : selected
            ? "bg-[rgb(218,210,210)] border-red-400"
            : "border-gray-200"
        }
      `}
      >
        <div className="flex gap-2" >
          <input type="radio" checked={selected} readOnly />
          <p className="text-sm">{option}</p>
        </div>

        {selected && !isCorrectOption && <ImCross className="text-red-600" />}

        {isCorrectOption && <TiTick className="text-green-600" />}
      </div>
    );
  };

  const renderDetailedAnalytics = (data: QuizData, index: number) => (
    <div
      key={`${data.quizId}-${data.created_at}-${index}`}
      className="p-4  rounded-lg shadow mb-4 bg-[rgb(250,250,250)]"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-4 items-center">
          <span className="font-bold">Quiz ID: {index + 1}</span>
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${
              data.choose_option - 1 === data.correctAnswer
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {data.choose_option - 1 === data.correctAnswer
              ? "Correct"
              : "Incorrect"}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(data.created_at).toLocaleDateString("en-GB")}
        </span>
      </div>

      <p className="text-lg font-semibold mb-2">Question: {data.question}</p>

      <div className="flex flex-col gap-2 mb-2">
        {data.options.map((option, idx) =>
          renderOption(option, idx, data.correctAnswer, data.choose_option)
        )}
      </div>

      <p className="text-sm text-gray-600">
        <strong>Explanation:</strong> {data.explanation}
      </p>
    </div>
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg lg:mt-8 md:max-w-[60%] xl:max-w-[40%]">
      {detailedAnalytics.length === 0 && (
        <div className="text-center py-10">
          <p className="mb-4 text-lg font-medium">No quiz played yet</p>
          <Link href="/quizzes">
            <button className="px-4 py-2 bg-linear-to-r from-orange-500 to-orange-300 text-white rounded hover:scale-105 transition">
              Play Quiz
            </button>
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {currentQuestions.map(renderDetailedAnalytics)}
      </div>

      {detailedAnalytics.length > 0 && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <Link href="/quizzes">
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-linear-to-r from-orange-500 to-orange-300 text-white rounded hover:scale-105 transition"
            >
              Play More Quiz
            </button>
          </Link>

          <div className="flex gap-2 flex-wrap">
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => {
                  scrollToTop();
                  paginate(number + 1);
                }}
                className={`px-3 py-1 border rounded ${
                  currentPage === number + 1
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPlayedQuiz;
