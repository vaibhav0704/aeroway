import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { uploadToS3 } from "@/app/api/utils/s3";
import { adminAuth } from "@/app/api/middlewares/verify-admin";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await adminAuth(req);
    if (auth instanceof NextResponse) return auth;
  const params = await context.params;
  const adminId = params.id ?? null;

  if (!adminId) {
    return NextResponse.json(
      { message: "Invalid admin ID" },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileData = {
      buffer,
      originalname: file.name ?? "file",
      mimetype: file.type ?? "application/octet-stream",
    };

    const fileUrl = await uploadToS3("profile", fileData);
    const db = getDB();

    await db.execute(
      "UPDATE admin SET image = ? WHERE id = ?",
      [fileUrl, adminId]
    );

    return NextResponse.json(
      { message: "Profile photo updated successfully", photoUrl: fileUrl },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server error uploading photo" },
      { status: 500 }
    );
  }
}
