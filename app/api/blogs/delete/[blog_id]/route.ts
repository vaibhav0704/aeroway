import { getDB } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = {
  blog_id: string;
};

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  const { blog_id } = await context.params;

  console.log("BLOG_ID:", blog_id);

  if (!blog_id) {
    return NextResponse.json(
      { success: false, message: "Blog ID is required" },
      { status: 400 }
    );
  }

  try {
    const db = await getDB();

    const [rows]: any = await db.query(
      "SELECT * FROM blogs WHERE blog_id = ?",
      [blog_id]
    );

    if (!rows.length) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    await db.execute(
      "DELETE FROM blogs WHERE blog_id = ?",
      [blog_id]
    );

    revalidatePath("/admin/dashboard");

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete blog error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting blog",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
