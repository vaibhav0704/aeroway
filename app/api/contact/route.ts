import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { sendMail } from "../utils/sendMail";


export const runtime = "nodejs";

interface ContactData {
  name: string;
  email: string;
  number: string;
  subject?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {

    const body = await req.json();

    const { name, email, number, subject, message } = body as ContactData;

    if (!name?.trim() || !email?.trim() || !number?.trim()) {
      return NextResponse.json(
        { message: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

 

    const db = getDB();
    const insertQuery =
      "INSERT INTO contact_us (name, email, number, subject, message) VALUES (?, ?, ?, ?, ?)";

    await db.execute(insertQuery, [
      name,
      email,
      number,
      subject || null,
      message || null,
    ]);


    
    const html = `
      <div style="font-family: Arial; padding: 20px; color: #333;">
        <h2 style="color: #f97316;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <div>${message || "N/A"}</div>
      </div>
    `;

   
    

    await sendMail(subject || "New Contact Form Submission", html);


    return NextResponse.json(
      { message: "Sent successfully!" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        message: "Server error, please try again later.",
        error: err?.message,
      },
      { status: 500 }
    );
  }
}
