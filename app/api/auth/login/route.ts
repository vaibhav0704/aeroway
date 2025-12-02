import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginRequestBody {
  emailOrUsername: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginRequestBody = await req.json();
    const { emailOrUsername, password } = body;

    if (!password || password.trim() === "") {
      return NextResponse.json({ Error: "Please enter password" }, { status: 400 });
    }

    const db = getDB();

    const [users] = await db.query(
      "SELECT * FROM auth WHERE email = ? OR username = ?",
      [emailOrUsername, emailOrUsername]
    );

    if ((users as any[]).length === 0) {
      return NextResponse.json({ Error: "No matching email or username found." }, { status: 404 });
    }

    const user = (users as any[])[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ Error: "Password not matched!" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.idauth, name: user.name },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({ Success: "Login successful", token }, { status: 200 });
    response.cookies.set("token", token, { httpOnly: true, path: "/" });

    return response;
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ Error: "Login error in server" }, { status: 500 });
  }
}
