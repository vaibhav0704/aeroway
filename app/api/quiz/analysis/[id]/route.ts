import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  const db = getDB();
  try {
    const sql = `SELECT * FROM quiz_analytics WHERE userId = ?`;
    const [results]: any = await db.query(sql, [params.id]);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching quiz analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
