import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const response = NextResponse.json({ Status: "Success" });

    response.cookies.set({
      name: "admin-token",
      value: "",
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { Status: "Error", message: "Logout failed" },
      { status: 500 }
    );
  }
}
