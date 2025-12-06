
import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "../../utils/slug";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const categoryName = body?.category?.toString()?.trim();

    if (!categoryName) {
      return NextResponse.json({ message: "Category is required" }, { status: 400 });
    }

    const slug = generateSlug(categoryName);
    const db = getDB();

    const sql = "INSERT INTO `blog_category`(`category_name`, `category_slug`) VALUES (?, ?)";
    await db.execute(sql, [categoryName, slug]);

    return NextResponse.json({ message: "Category Added" });
  } catch (err: any) {
    console.error("Add category error:", err);
    return NextResponse.json({ message: "Error", error: err.message }, { status: 500 });
  }
}
