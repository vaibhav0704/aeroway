import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { verify } from "jsonwebtoken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded: any = verify(token, process.env.JWT_SECRET_KEY as string);

    const db = getDB();
    const [rows] = await db.query("SELECT * FROM admin WHERE id = ?", [decoded.id]);
    const data = rows as any[];

    if (!data || data.length === 0) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const { password: _, ...cleanUser } = data[0];

    return NextResponse.json({
      authenticated: true,
      admin: cleanUser,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
