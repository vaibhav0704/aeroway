import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

interface QuizData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export async function POST(req: NextRequest) {
  const db = getDB();
  try {
    const { questionsData }: { questionsData: QuizData[] } = await req.json();

    if (!questionsData || questionsData.length === 0)
      return NextResponse.json({ error: "No quiz data provided" }, { status: 400 });

    const values = questionsData.map(({ question, options, correctAnswer, explanation }) => [
      question,
      JSON.stringify(options),
      correctAnswer,
      explanation,
    ]);

    const sql =
      "INSERT INTO quizzes (`question`, `options`, `correctAnswer`, `explanation`) VALUES ?";

    const [result]: any = await db.query(sql, [values]);

    return NextResponse.json({ message: "Quizzes added successfully", inserted: result.affectedRows });
  } catch (error: any) {
    console.error("Error in addQuiz:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
