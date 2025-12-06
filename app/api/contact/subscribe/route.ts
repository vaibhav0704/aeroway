import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const db = getDB();

     const [existing]: any = await db.execute(
      "SELECT id FROM subscribers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "This email is already subscribed" },
        { status: 400 }
      );
    }

    const SQL = `INSERT INTO subscribers (email, timestamp) VALUES (?, NOW())`;
    await db.execute(SQL, [email]);

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (error: any) {
    console.error("Subscribe Error:", error);
    return NextResponse.json(
      { message: "Failed to subscribe", error: error.message },
      { status: 500 }
    );
  }
};
