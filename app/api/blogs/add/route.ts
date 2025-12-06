import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "../../utils/s3";
import { generateSlug } from "../../utils/slug";


export const runtime = "nodejs";
export const revalidate = 0;

export async function PUT(req: NextRequest) {
  try {
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

    const slug = generateSlug(title);

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

    const sql =
      "INSERT INTO `blogs` (`blog_slug`, `blog_title`, `blog_tag`, `blog_category_id`, `blog_description`, `blog_feature_image`, `blog_content`, `blog_publisher_id`, `blog_date_time`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const blogDateTime = date && time ? `${date} ${time}` : null;

    const values = [
      slug,
      title,
      tag,
      category || null,
      description,
      featureImageUrl,
      content,
      publisher || null,
      blogDateTime,
    ];

    await db.execute(sql, values);

    return NextResponse.json({ message: "Data inserted successfully" });
  } catch (error: any) {
    console.error("Add blog error:", error);
    return NextResponse.json({ message: "Error inserting blog", error: error.message }, { status: 500 });
  }
}
