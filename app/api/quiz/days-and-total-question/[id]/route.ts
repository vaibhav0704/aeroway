import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const db = getDB();
  const id = params.id;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  try {
    const sql = `
      SELECT 
        DAY(created_at) AS day,
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correct_count,
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS wrong_count
      FROM quiz_analytics
      WHERE userId = ?
      AND YEAR(created_at) = ?
      AND MONTH(created_at) = ?
      GROUP BY DAY(created_at)
      ORDER BY DAY(created_at)
    `;

    const sqlTotal = `
      SELECT 
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correctQuestion,
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS wrongQuestion
      FROM quiz_analytics
      WHERE userId = ?
    `;

    const [dailyResults]: any = await db.query(sql, [id, currentYear, currentMonth]);
    const [totalResults]: any = await db.query(sqlTotal, [id]);

    return NextResponse.json({
      dailyResults,
      totalResult: [+totalResults[0].correctQuestion, +totalResults[0].wrongQuestion],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error in fetching quizzes" }, { status: 500 });
  }
}
