import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDB } from "@/lib/db"; // MUST return mysql2/promise connection

export async function GET(req: NextRequest) {

  try {
    const db = await getDB();

    // Read token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.log("No token found");
      return NextResponse.json({ Error: "No token found" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      id: number;
    };

    const [rows]: any = await db.query(
      "SELECT * FROM auth WHERE idauth = ?",
      [decoded.id]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ Error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    return NextResponse.json(
      {
        Status: "Success",
        id: decoded.id,
        name: user.name,
        username: user.username,
        profession: user.profession,
        profile: user.profile,
        bio: user.bio,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Check auth error:", error);
    return NextResponse.json(
      { Error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
