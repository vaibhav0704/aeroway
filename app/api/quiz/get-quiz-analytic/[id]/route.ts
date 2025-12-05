import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: NextRequest,
  context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
     const { id } = params;
    const db = await getDB();


    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const sqlDaily = `
      SELECT DAY(created_at) AS day,
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correct_count,
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS wrong_count
      FROM quiz_analytics
      WHERE userId = ?
      AND YEAR(created_at) = ?
      AND MONTH(created_at) = ?
      GROUP BY DAY(created_at)
      ORDER BY DAY(created_at)
    `;
    const [dailyResults]: any = await db.query(sqlDaily, [id, currentYear, currentMonth]);

    const sqlTotal = `
      SELECT
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correctQuestion,
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS wrongQuestion
      FROM quiz_analytics
      WHERE userId = ?
    `;
    const [totalResults]: any = await db.query(sqlTotal, [id]);
    const totalResult = totalResults[0] ? [+totalResults[0].correctQuestion || 0, +totalResults[0].wrongQuestion || 0] : [0, 0];

    return NextResponse.json({ dailyResults, totalResult });
  } catch (err) {
    console.error("get-quiz-analytic error:", err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
