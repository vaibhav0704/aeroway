import { uploadToS3 } from "../../../api/utils/s3";
import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { generateSlug } from "../../utils/slug";
import { adminAuth } from "../../middlewares/verify-admin";

interface FileData {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const auth = await adminAuth(req);
    if (auth instanceof NextResponse) return auth;
  try {
    const formData = await req.formData();

    const magazineTitle = formData.get("magazineTitle")?.toString() || "";
    const tags = formData.get("tags")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const MagCloudLink = formData.get("MagCloudLink")?.toString() || "";
    const PdfLink = formData.get("PdfLink")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const magazine_slug=generateSlug(magazineTitle);

   
    if (!magazineTitle || !MagCloudLink || !tags || !date || !description) {
      return NextResponse.json(
        {
          message:
            "Required fields (Title, MagCloudLink, Tags, Date, Content) are missing",
        },
        { status: 400 }
      );
    }

   
    const file = formData.get("image") as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json(
        { message: "Feature image file is required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileDataForS3: FileData = {
      buffer,
      originalname: file.name,
      mimetype: file.type,
    };

    const imageUrl = await uploadToS3("magazines", fileDataForS3);

 
    const magazine_id = uuid();
    const db = getDB();

    const sql = `
      INSERT INTO magazines 
      (
        magazine_id,
        magazine_title,
        magazine_description,
        magazine_tags,
        magazine_cover_image,
        magazine_link,
        MagCloudLink,
        magazine_date,
        magazine_slug,
        magazine_category
      ) 
      VALUES (?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      magazine_id,
      magazineTitle,
      description,
      tags,
      imageUrl,
      PdfLink,
      MagCloudLink,
      date,
      magazine_slug,
      category,
    ];

    await db.execute(sql, values);

    return NextResponse.json({ message: "Data inserted Successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error inserting magazine", error: error.message },
      { status: 500 }
    );
  }
}
