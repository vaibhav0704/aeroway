import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { Error: "Email and password are required" },
        { status: 400 }
      );
    }

    const db = getDB();
    const [rows] = await db.query(
      "SELECT * FROM `admin` WHERE `email` = ?",
      [email]
    );

    const data = rows as any[];

    if (data.length === 0) {
      return NextResponse.json({ Error: "No email existed" }, { status: 404 });
    }

    const user = data[0];

    const isPasswordValid = await bcrypt.compare(
      password.toString(),
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { Error: "Password not matched!" },
        { status: 401 }
      );
    }

  
    const { password: _, ...cleanUser } = user;

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      Status: "Success",
      admin: cleanUser,
    });

    response.cookies.set({
      name: "admin-token",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { Error: "Login error in server", details: error.message },
      { status: 500 }
    );
  }
}
