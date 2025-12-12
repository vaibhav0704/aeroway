import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pool = getDB();

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 5;
    const offset = (page - 1) * limit;

    // 1. Fetch paginated stories
    const [rows] = await pool.query(
      `
      SELECT id, story_slug, title, description, cover_image, media_type, created_date, status
      FROM stories
      ORDER BY created_date DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM stories`
    );

    const total = (countResult as any)[0].total;

    return NextResponse.json({ data: rows, total }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
