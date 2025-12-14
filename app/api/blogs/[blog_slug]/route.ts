import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest ,
  context: { params: Promise<{blog_slug: string }> } 
) {
  const params=await context.params;

 
  try {
    const db = await getDB();
    const [rows]: any = await db.query(
      "SELECT * FROM blogs WHERE blog_slug = ?",
      [params.blog_slug]
    );

    if (!rows.length) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
