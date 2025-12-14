import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { adminAuth } from "@/app/api/middlewares/verify-admin";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ magazine_id: string }> }
) {
  try {
    const auth = await adminAuth(req);
      if (auth instanceof NextResponse) return auth;
    const { magazine_id } = await context.params;
    const db = getDB();

    const [existingRows] = await db.query(
      "SELECT * FROM magazines WHERE magazine_id = ? LIMIT 1",
      [magazine_id]
    );

    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { error: "Magazine not found" },
        { status: 404 }
      );
    }

    await db.query("DELETE FROM magazines WHERE magazine_id = ?", [
      magazine_id,
    ]);

    return NextResponse.json({
      success: true,
      message: "Magazine deleted successfully",
      deleted_id: magazine_id,
    });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
