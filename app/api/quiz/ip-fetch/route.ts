import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  const db = getDB();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  try {
    const sql = `SELECT played FROM ip_quiz_analytic WHERE user_ip = ?`;
    const [results]: any = await db.query(sql, [ip]);
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch quiz play status" }, { status: 500 });
  }
}
