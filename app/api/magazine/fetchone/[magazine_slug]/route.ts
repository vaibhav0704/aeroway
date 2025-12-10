import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";

export interface Magazine {
  magazine_id: number;
  idMagazines: number;
  magazine_title: string;
  magazine_description: string;
  magazine_tags?: string;
  magazine_cover_image: string;
  magazine_link?: string;
  formatted_date: string;
  magazine_category?: string;
  MagCloudLink?: string;
}

export async function GET(req: NextRequest,
  context: { params: Promise<{magazine_slug: string }> } ) {
  try {
     const params = await context.params;
    const {magazine_slug}  = params;


    const db = getDB();
    const sql = `
      SELECT 
        magazine_id,
        idMagazines,
        magazine_title,
        magazine_description,
        magazine_tags,
        magazine_cover_image,
        magazine_link,
        DATE_FORMAT(magazine_date, '%Y-%m-%d') AS formatted_date, 
        magazine_category,
        MagCloudLink
      FROM magazines 
      WHERE magazine_slug = ?
    `;

    const [rows] = await db.query<RowDataPacket[]>(sql, [magazine_slug]);
    const results = rows as Magazine[];

    if (results.length === 0) {
      return NextResponse.json({ error: "Magazine Not Found" }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
