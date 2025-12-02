import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

interface AnalyticBody {
  userId: number;
  quizId: string;
  correct: boolean;
  choose_option: number;
  time_taken: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: AnalyticBody = await req.json();
    console.log(body);

    const db = await getDB();

    const sql =
      "INSERT INTO quiz_analytics (`userId`, `quizId`, `correct`, `choose_option`, `time_taken`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      body.userId,
      body.quizId,
      body.correct ? 1 : 0,
      body.choose_option,
      body.time_taken,
    ];

    await db.query(sql, values);

    return NextResponse.json({ message: "Quiz analytic added successfully" });
  } catch (error) {
    console.error("Error saving quiz analytic:", error);
    return NextResponse.json({ error: "Failed to save quiz analytic" }, { status: 500 });
  }
}
