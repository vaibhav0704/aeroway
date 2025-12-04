import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ Status: "Success" });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true, 
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { Status: "Error", message: "Logout failed" },
      { status: 500 }
    );
  }
}
