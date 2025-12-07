import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { blog_id, user_id, comment_text } = body;

    if (!user_id) {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }

    if (!blog_id || !comment_text?.trim()) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const db = getDB();
    await db.query(
      `INSERT INTO comments (blog_id, user_id, comment_text)
       VALUES (?, ?, ?)`,
      [blog_id, user_id, comment_text]
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
