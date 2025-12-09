import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db"; 

export async function GET(req: NextRequest) {
  try {
    const db = getDB();
    const [rows] = await db.query("SELECT * FROM `blog_category`");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
  }
}
