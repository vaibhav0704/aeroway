import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { uploadToS3 } from "@/app/api/utils/s3";


export const runtime = "nodejs";

export async function PUT(req: NextRequest, context: { params: Promise<{ blog_id: string }> }) {
  try {
    const params=await context.params;
    const { blog_id } = params;

    const formData = await req.formData();

    const title = formData.get("blog_title")?.toString() || "";
    const tag = formData.get("blog_tag")?.toString() || "";
    const category = formData.get("blog_category_id")?.toString() || "";
    const description = formData.get("blog_description")?.toString() || "";
    const content = formData.get("blog_content")?.toString() || "";
    const publisher = formData.get("blog_publisher_id")?.toString() || "";
    const date = formData.get("blog_date")?.toString() || "";
    const time = formData.get("blog_time")?.toString() || "";

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    let featureImageUrl: string | null = null;
    const file = formData.get("blog_feature_image") as File | null;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      featureImageUrl = await uploadToS3("blogs", {
        buffer,
        originalname: file.name,
        mimetype: file.type,
      });
    } else {
      const existingUrl = formData.get("blog_feature_image")?.toString();
      if (existingUrl) featureImageUrl = existingUrl;
    }

    const db = getDB();
    const blogDateTime = date && time ? `${date} ${time}` : null;

    const sql = `
      UPDATE blogs 
      SET 
        blog_title = ?,
        blog_tag = ?,
        blog_category_id = ?,
        blog_description = ?,
        blog_feature_image = ?,
        blog_content = ?,
        blog_publisher_id = ?,
        blog_date_time = ?
      WHERE blog_id = ?
    `;

    const values = [
      title,
      tag,
      category || null,
      description,
      featureImageUrl,
      content,
      publisher || null,
      blogDateTime,
      blog_id,
    ];

    await db.execute(sql, values);

    return NextResponse.json({ message: "Blog updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: "Error updating blog", error: error.message }, { status: 500 });
  }
}
