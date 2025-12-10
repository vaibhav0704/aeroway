import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const adminId = params.id;

  try {
    const body = await req.json();

    const name = body.name ?? null;
    const number = body.number ?? null;
    const bio = body.bio ?? null;

    if (!name || !bio) {
      return NextResponse.json(
        { error: "Name and bio are required" },
        { status: 400 }
      );
    }

    const db = getDB();

    await db.execute(
      "UPDATE admin SET name = ?, number = ?, bio = ? WHERE id = ?",
      [name, number, bio, adminId]
    );

    return NextResponse.json(
      { message: "Admin updated successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error updating admin" },
      { status: 500 }
    );
  }
}
