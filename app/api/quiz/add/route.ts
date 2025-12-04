import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const questionsData = body.questions;
    if (!questionsData || questionsData.length === 0) return NextResponse.json({ error: "No quiz data provided" }, { status: 400 });

    const db = await getDB();
    const values = questionsData.map((q: any) => {
      if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
        throw new Error(`Invalid correctAnswer for question: ${q.question}`);
      }
      return [q.question, JSON.stringify(q.options), q.correctAnswer, q.explanation || ""];
    });

    const sql = "INSERT INTO quizzes (`question`, `options`, `correctAnswer`, `explanation`) VALUES ?";
    const [result]: any = await db.query(sql, [values]);
    return NextResponse.json({ message: "Quizzes added successfully", inserted: result.affectedRows });
  } catch (err: any) {
    console.error("add quiz error:", err);
    return NextResponse.json({ error: err.message || "Failed to add quizzes" }, { status: 500 });
  }
}
