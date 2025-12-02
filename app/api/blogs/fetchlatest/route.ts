import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = getDB();
    const sql = `
      SELECT b.blog_id,
             b.blog_feature_image,
             b.blog_description,
             b.blog_title,
             b.blog_slug,
             DATE_FORMAT(b.blog_date_time, '%e %M %Y') AS formatted_date,
             bc.category_id,
             bc.category_name,
             bc.category_slug
      FROM blogs b
      INNER JOIN blog_category bc ON b.blog_category_id = bc.category_id
      WHERE b.status = 1
      ORDER BY b.blog_date_time DESC
      LIMIT 6
    `;
    const [data] = await db.query(sql);


    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching latest blogs:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
