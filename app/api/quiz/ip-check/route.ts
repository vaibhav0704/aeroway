import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  const db = getDB();
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  try {
    const sql = `INSERT INTO ip_quiz_analytic (user_ip, played) VALUES (?,1)`;
    await db.query(sql, [ip]);
    return NextResponse.json({ message: "Quiz analytic added successfully", played: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add quiz" }, { status: 500 });
  }
}
