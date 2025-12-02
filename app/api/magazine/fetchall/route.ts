import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = getDB();
    const sql = `
      SELECT magazine_id, idMagazines,
             magazine_title,
             magazine_description,
             magazine_tags, 
             magazine_cover_image,
             magazine_link,
             magazine_slug,
             DATE_FORMAT(magazine_date, '%Y-%m-%d') AS formatted_date, 
             magazine_category,
             MagCloudLink  
      FROM magazines  
      WHERE status = '1' 
      ORDER BY magazine_date DESC
    `;

    const [results] = await db.query(sql);



    return NextResponse.json(results);
  } catch (err) {
    console.error("Error fetching magazines:", err);
    return NextResponse.json(
      { error: "Error in fetching magazines" },
      { status: 400 }
    );
  }
}
