import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { adminAuth } from "@/app/api/middlewares/verify-admin";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await adminAuth(req);
      if (auth instanceof NextResponse) return auth;
    const { id } = await context.params;
    const db = getDB();

    const [existingRows] = await db.query(
      "SELECT * FROM stories WHERE id = ? LIMIT 1",
      [id]
    );

    if ((existingRows as any[]).length === 0) {
      return NextResponse.json(
        { error: "Story not found" },
        { status: 404 }
      );
    }

    await db.query("DELETE FROM stories WHERE id = ?", [
      id,
    ]);

    return NextResponse.json({
      success: true,
      message: "Story deleted successfully",
      deleted_id: id,
    });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
