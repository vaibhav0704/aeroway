import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const db = getDB();
  try {
    const sql = `
      SELECT 
        qa.quizId, 
        qa.choose_option, 
        qa.created_at, 
        q.question, 
        q.options, 
        q.correctAnswer, 
        q.explanation 
      FROM quiz_analytics qa
      JOIN quizzes q ON qa.quizId = q._id
      WHERE qa.userId = ?
      ORDER BY qa.created_at DESC
    `;

    const [results]: any = await db.query(sql, [params.id]);
    const formatted = results.map((r: any) => ({ ...r, options: JSON.parse(r.options) }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching detailed analytics:", error);
    return NextResponse.json({ error: "Failed to fetch detailed analytics" }, { status: 500 });
  }
}
