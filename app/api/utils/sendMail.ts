import nodemailer from "nodemailer";

interface Attachment {
  filename: string;
  path: string;
}

export async function sendMail(
  subject: string,
  html: string,
  attachments?: Attachment[]
) {


  const CLEAN_PASS = process.env.EMAIL_PASS?.replace(/\s+/g, "") || "";


  const EMAIL = process.env.EMAIL_USER;
  const PASS = CLEAN_PASS;
  const HOST = "smtp.gmail.com"; 
  const PORT = 465; 

  if (!EMAIL || !PASS || !HOST) {
    throw new Error("SMTP environment variables missing");
  }



  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: true, 
    auth: {
      user: EMAIL,
      pass: PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    logger: true,
    debug: true,
  });



  try {
    const info = await transporter.sendMail({
      from: `"Aeroway" <${EMAIL}>`,
      to: process.env.RECIEVER_EMAIL,
      subject,
      html,
      attachments: attachments?.map((a) => ({
        filename: a.filename,
        path: a.path,
      })),
    });

    return info;

  } catch (error) {
    throw error;
  }
}
