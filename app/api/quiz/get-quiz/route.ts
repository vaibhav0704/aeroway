import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET() {
  const db = getDB();

  try {
    const [results]: any = await db.query("SELECT * FROM quizzes");

    const quizzes = results.map((quiz: any) => {
      let optionsArray: string[] = [];

      if (typeof quiz.options === "string") {
        // Try parse JSON first
        try {
          optionsArray = JSON.parse(quiz.options);
          if (!Array.isArray(optionsArray)) throw new Error();
        } catch {
          // Fallback: split comma-separated string
          optionsArray = quiz.options.split(",").map((opt: string) => opt.trim());
        }
      } else if (Array.isArray(quiz.options)) {
        optionsArray = quiz.options;
      } else {
        // Fallback for unexpected format
        optionsArray = [];
      }

      return {
        _id: quiz._id,
        question: quiz.question,
        options: optionsArray,
        correctAnswer: Number(quiz.correctAnswer),
        explanation: quiz.explanation,
      };
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json({ error: "Error fetching quizzes" }, { status: 500 });
  }
}
