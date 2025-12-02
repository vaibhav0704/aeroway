import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db"; // your mysql2/promise connection
import { uploadToS3 } from "@/lib/s3"; // your S3 upload utility
import formidable from "formidable";
import fs from "fs";

// Disable default body parsing for multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;

  const form = formidable({ multiples: false });

  return new Promise<NextResponse>((resolve) => {
    form.parse(req as any, async (err, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return resolve(NextResponse.json({ Error: "Form parsing failed" }, { status: 400 }));
      }

      const { name, username, email, profession, bio } = fields;
      let user_profile = fields.user_profile as string | undefined;

      // Handle file upload if exists
      if (files.user_profile) {
        const file = files.user_profile as formidable.File;
        try {
          user_profile = await uploadToS3("users_profile", file, name as string);
          // Remove temp file
          fs.unlinkSync(file.filepath);
        } catch (error) {
          console.error("S3 upload error:", error);
          return resolve(NextResponse.json({ Error: "Failed to upload image" }, { status: 500 }));
        }
      }

      try {
        const db = await getDB();

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

        await db.query(SQL, [
          email,
          username,
          user_profile || null,
          name,
          profession,
          bio,
          userId,
        ]);

        // Fetch updated user
        const [rows]: any = await db.query("SELECT * FROM auth WHERE idauth = ?", [userId]);
        const updatedUser = rows[0];

        resolve(
          NextResponse.json({
            _id: updatedUser.idauth,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            profession: updatedUser.profession,
            bio: updatedUser.bio,
            profile: updatedUser.profile,
          })
        );
      } catch (error) {
        console.error("Database error:", error);
        resolve(NextResponse.json({ Error: "Database update failed" }, { status: 500 }));
      }
    });
  });
}
