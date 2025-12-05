import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { RowDataPacket } from "mysql2";

// ---------- Types ----------
interface AnalyticsItem extends RowDataPacket {
  period?: string;
  correct_count: number;
  wrong_count: number;
  total_count: number;
  correct_percentage: number;
}

interface AnalyticsState {
  currentDay: AnalyticsItem[];
  currentWeek: AnalyticsItem[];
  currentMonth: AnalyticsItem[];
  currentYear: AnalyticsItem[];
}

// ---------- Handler ----------
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const userId = params?.id;

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    const db = getDB();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // ---------------- SQL QUERIES ----------------
    const sqlCurrentDay = `
      SELECT DATE(created_at) AS period,
             CAST(SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS UNSIGNED) AS correct_count,
             CAST(SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS UNSIGNED) AS wrong_count,
             CAST(COUNT(*) AS UNSIGNED) AS total_count,
             CAST(IFNULL((SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END)/COUNT(*))*100,0) AS DECIMAL(5,2)) AS correct_percentage
      FROM quiz_analytics
      WHERE userId = ?
        AND DATE(created_at) = CURDATE()
      GROUP BY DATE(created_at)
    `;

    const sqlCurrentWeek = `
      SELECT YEARWEEK(created_at,1) AS period,
             CAST(SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS UNSIGNED) AS correct_count,
             CAST(SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS UNSIGNED) AS wrong_count,
             CAST(COUNT(*) AS UNSIGNED) AS total_count,
             CAST(IFNULL((SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END)/COUNT(*))*100,0) AS DECIMAL(5,2)) AS correct_percentage
      FROM quiz_analytics
      WHERE userId = ?
        AND YEARWEEK(created_at,1) = YEARWEEK(CURDATE(),1)
      GROUP BY YEARWEEK(created_at,1)
    `;

    const sqlCurrentMonth = `
      SELECT DATE_FORMAT(created_at,"%Y-%m") AS period,
             CAST(SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS UNSIGNED) AS correct_count,
             CAST(SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS UNSIGNED) AS wrong_count,
             CAST(COUNT(*) AS UNSIGNED) AS total_count,
             CAST(IFNULL((SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END)/COUNT(*))*100,0) AS DECIMAL(5,2)) AS correct_percentage
      FROM quiz_analytics
      WHERE userId = ?
        AND YEAR(created_at) = ?
        AND MONTH(created_at) = ?
      GROUP BY DATE_FORMAT(created_at,"%Y-%m")
    `;

    const sqlCurrentYear = `
      SELECT YEAR(created_at) AS period,
             CAST(SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) AS UNSIGNED) AS correct_count,
             CAST(SUM(CASE WHEN correct = 0 THEN 1 ELSE 0 END) AS UNSIGNED) AS wrong_count,
             CAST(COUNT(*) AS UNSIGNED) AS total_count,
             CAST(IFNULL((SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END)/COUNT(*))*100,0) AS DECIMAL(5,2)) AS correct_percentage
      FROM quiz_analytics
      WHERE userId = ?
        AND YEAR(created_at) = ?
      GROUP BY YEAR(created_at)
    `;

    // ---------- Execute queries with proper typing ----------
    const [dayRows] = await db.query<AnalyticsItem[]>(sqlCurrentDay, [userId]);
    const [weekRows] = await db.query<AnalyticsItem[]>(sqlCurrentWeek, [userId]);
    const [monthRows] = await db.query<AnalyticsItem[]>(sqlCurrentMonth, [
      userId,
      currentYear,
      currentMonth,
    ]);
    const [yearRows] = await db.query<AnalyticsItem[]>(sqlCurrentYear, [
      userId,
      currentYear,
    ]);

    // ---------- Response ----------
    const response: AnalyticsState = {
      currentDay: dayRows,
      currentWeek: weekRows,
      currentMonth: monthRows,
      currentYear: yearRows,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error fetching quiz analytics:", err);
    return NextResponse.json(
      { error: "Failed to fetch quiz analytics" },
      { status: 500 }
    );
  }
}
