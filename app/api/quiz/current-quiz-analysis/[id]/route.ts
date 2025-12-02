import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const db = getDB();
  const id = params.id;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  try {
    const sqlCurrentDay = `
      SELECT 
        DATE(created_at) AS period, 
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correct_count, 
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS wrong_count,
        COUNT(*) AS total_count,
        (SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS correct_percentage
      FROM quiz_analytics
      WHERE userId = ?
      AND DATE(created_at) = CURDATE()
      GROUP BY DATE(created_at)
    `;

    const sqlCurrentWeek = `
      SELECT 
        YEARWEEK(created_at, 1) AS period, 
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correct_count, 
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS wrong_count,
        COUNT(*) AS total_count,
        (SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS correct_percentage
      FROM quiz_analytics
      WHERE userId = ?
      AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)
      GROUP BY YEARWEEK(created_at, 1)
    `;

    const sqlCurrentMonth = `
      SELECT 
        DATE_FORMAT(created_at, "%Y-%m") AS period, 
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correct_count, 
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS wrong_count,
        COUNT(*) AS total_count,
        (SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS correct_percentage
      FROM quiz_analytics
      WHERE userId = ?
      AND YEAR(created_at) = ?
      AND MONTH(created_at) = ?
      GROUP BY DATE_FORMAT(created_at, "%Y-%m")
    `;

    const sqlCurrentYear = `
      SELECT 
        YEAR(created_at) AS period, 
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS correct_count, 
        SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS wrong_count,
        COUNT(*) AS total_count,
        (SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS correct_percentage
      FROM quiz_analytics
      WHERE userId = ?
      AND YEAR(created_at) = ?
      GROUP BY YEAR(created_at)
    `;

    const [currentDay]: any = await db.query(sqlCurrentDay, [id]);
    const [currentWeek]: any = await db.query(sqlCurrentWeek, [id]);
    const [currentMonth]: any = await db.query(sqlCurrentMonth, [id, currentYear, currentMonth]);
    const [currentYearData]: any = await db.query(sqlCurrentYear, [id, currentYear]);

    return NextResponse.json({ currentDay, currentWeek, currentMonth, currentYear: currentYearData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error in fetching quiz analysis" }, { status: 500 });
  }
}
