import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type AdminTokenPayload = {
  id: number;
  role?: string;
};

export async function adminAuth(req: NextRequest) {
  try {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Admin token missing" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as AdminTokenPayload;

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Access denied: Admin only" },
        { status: 403 }
      );
    }

    return { adminId: decoded.id };
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired Admin" },
      { status: 403 }
    );
  }
}
