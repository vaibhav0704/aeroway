import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { uploadToS3 } from "@/lib/s3Utility";
import { generateSlug } from "../../utils/slug";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const tag = formData.get("tag") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const publisher = formData.get("publisher") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const file = formData.get("file") as File; // Assuming file input

    const imageUrl = await uploadToS3("blogs", file, title);
    const slug = generateSlug(title);

    const sql = `
      INSERT INTO blogs 
      (blog_slug, blog_title, blog_tag, blog_category_id, blog_description, blog_feature_image, blog_content, blog_publisher_id, blog_date_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const db = getDB();
    const [result] = await db.query(sql, [
      slug,
      title,
      tag,
      category,
      description,
      imageUrl,
      content,
      publisher,
      `${date} ${time}`,
    ]);

    return NextResponse.json({ message: "Blog added successfully", data: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add blog" }, { status: 500 });
  }
}
