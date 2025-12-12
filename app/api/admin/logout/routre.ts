import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const response = NextResponse.json({ Status: "Success" });

    // Clear the admin-token cookie
    response.cookies.set("admin-token", "", {
      httpOnly: true,
      secure: true, // works for both dev and prod
      expires: new Date(0),
      path: "/", // must match the path used during login
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { Status: "Error", message: "Logout failed" },
      { status: 500 }
    );
  }
}
