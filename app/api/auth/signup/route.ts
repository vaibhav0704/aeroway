import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import bcrypt from "bcrypt";

interface SignupRequestBody {
  email: string;
  username: string;
  password: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SignupRequestBody = await req.json();
    const { email, username, password, name } = body;

    const db = getDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [existingUsers] = await db.query(
      "SELECT * FROM auth WHERE username = ? OR email = ?",
      [username, email]
    );

    if ((existingUsers as any[]).length > 0) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }
    await db.query(
      "INSERT INTO auth (username, email, password, name, role, date) VALUES (?, ?, ?, ?, ?, ?)",
      [username, email, hashedPassword, name, "user", currentDate]
    );

    const responseMessage = `Hey, ${name}! Account created successfully.`;
    return NextResponse.json(
      { message: responseMessage },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
