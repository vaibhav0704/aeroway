import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";



export async function GET(
  req: NextRequest,
  context:{params:Promise<{storyId:string}>}
) {
  const params=await context.params;
  const id=params.storyId
  const storyId=Number(id);

  try {
    const pool = getDB();

    if (!storyId) {
      return NextResponse.json(
        { error: "Invalid story id" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(
      `
      SELECT 
        id,
        story_slug,
        title,
        description,
        cover_image,
        media_type,
        created_date,
        status
      FROM stories
      WHERE id = ?
      LIMIT 1
      `,
      [storyId]
    );

    const story = (rows as any[])[0];

    if (!story) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: story },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get one story error:", error);
    return NextResponse.json(
      { error: "Failed to fetch story" },
      { status: 500 }
    );
  }
}
