import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, quizId, correct, choose_option, time_taken } = body;

    const db = await getDB();
    const sql = "INSERT INTO quiz_analytics (`userId`, `quizId`, `correct`, `choose_option`, `time_taken`) VALUES (?, ?, ?, ?, ?)";
    await db.query(sql, [userId, quizId, correct ? 1 : 0, choose_option, time_taken]);
    return NextResponse.json({ message: "Quiz analytic added successfully" });
  } catch (err) {
    console.error("save analytic error:", err);
    return NextResponse.json({ error: "Failed to save quiz analytic" }, { status: 500 });
  }
}
