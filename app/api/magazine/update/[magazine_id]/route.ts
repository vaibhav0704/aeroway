import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

import { RowDataPacket } from "mysql2/promise";
import { generateSlug } from "@/app/api/utils/slug";
import { uploadToS3 } from "@/app/api/utils/s3";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ magazine_id: string }> }
) {
  try {
    const { magazine_id } = await context.params;

    const formData = await req.formData();

    const magazine_title = formData.get("magazine_title")?.toString() || "";
    const magazine_description =
      formData.get("magazine_description")?.toString() || "";
    const magazine_tags = formData.get("magazine_tags")?.toString() || "";
    const magazine_link = formData.get("magazine_link")?.toString() || "";
    const magazine_category =
      formData.get("magazine_category")?.toString() || "";
    const MagCloudLink = formData.get("MagCloudLink")?.toString() || "";

    const file = formData.get("magazine_cover_image") as File | null;

    const db = getDB();

    const [oldRows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM magazines WHERE magazine_id = ? LIMIT 1",
      [magazine_id]
    );

    if (oldRows.length === 0) {
      return NextResponse.json(
        { error: "Magazine not found" },
        { status: 404 }
      );
    }

    const oldMagazine = oldRows[0];

    const newSlug = generateSlug(magazine_title);

    let imageUrl = oldMagazine.magazine_cover_image;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      imageUrl = await uploadToS3("magazine_covers", {
        buffer,
        originalname: file.name,
        mimetype: file.type,
      });
    }

    const sql = `
      UPDATE magazines SET
        magazine_title = ?,
        magazine_slug = ?,
        magazine_description = ?,
        magazine_tags = ?,
        magazine_cover_image = ?,
        magazine_link = ?,
        magazine_category = ?,
        MagCloudLink = ?
      WHERE magazine_id = ?
    `;

    await db.query(sql, [
      magazine_title,
      newSlug,
      magazine_description,
      magazine_tags,
      imageUrl,
      magazine_link,
      magazine_category,
      MagCloudLink,
      magazine_id,
    ]);

    return NextResponse.json({
      success: true,
      message: "Magazine updated successfully",
      updated_id: magazine_id,
      new_slug: newSlug,
      updated_image: imageUrl,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
