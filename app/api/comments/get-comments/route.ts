import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const blog_id = searchParams.get("blog_id");

    if (!blog_id) {
      return NextResponse.json({ error: "blog_id required" }, { status: 400 });
    }

    const db = getDB();
    const [rows] = await db.query(
      `SELECT c.comment_id, c.comment_text, c.created_at,
              a.username, a.profile
       FROM comments c
       JOIN auth a ON c.user_id = a.idauth
       WHERE c.blog_id = ?
       ORDER BY c.created_at DESC`,
      [blog_id]
    );

    return NextResponse.json({ comments: rows });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
