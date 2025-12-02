import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const sql = `
      SELECT b.blog_id, b.blog_feature_image, b.blog_description, b.blog_slug, b.blog_title,
             DATE_FORMAT(b.blog_date_time, '%e %M %Y') AS formatted_date,
             bc.category_id, bc.category_name ,b.blog_content
      FROM blogs b
      INNER JOIN blog_category bc ON b.blog_category_id = bc.category_id
      WHERE b.status = 1
      ORDER BY b.blog_date_time DESC
    `;
    const db = getDB();
    const [data] = await db.query(sql);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
