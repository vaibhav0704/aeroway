import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { uploadToS3 } from "../../utils/s3";

export const dynamic = "force-dynamic"; 
export const revalidate = 0;            
export const runtime = "nodejs";       

export const fetchCache = "force-no-store"; 

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id")?.toString();
    const email = formData.get("email")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const username = formData.get("username")?.toString() || "";
    const profession = formData.get("profession")?.toString() || "";
    const bio = formData.get("bio")?.toString() || "";

    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    let profileUrl: string | null = null;

    const file = formData.get("profile") as File | null;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      profileUrl = await uploadToS3("users_profile", {
        buffer,
        originalname: file.name,
        mimetype: file.type,
      });
    } else {
      const existingProfile = formData.get("profile")?.toString();
      if (existingProfile) profileUrl = existingProfile;
    }

    const db = getDB();
    const SQL = `
      UPDATE auth SET
        email = ?,
        username = ?,
        profile = ?,
        name = ?,
        profession = ?,
        bio = ?
      WHERE idauth = ?
    `;

    await db.execute(SQL, [email, username, profileUrl, name, profession, bio, id]);

    return NextResponse.json({ message: "User updated successfully", profile: profileUrl });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Database Error", error: error.message },
      { status: 500 }
    );
  }
}
