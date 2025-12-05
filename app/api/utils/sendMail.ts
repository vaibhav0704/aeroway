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

  const RECEIVER_EMAIL = process.env.EMAIL_USER; 

  if (!RECEIVER_EMAIL) {
    throw new Error("Receiver email is not defined in environment variables");
  }

  
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: RECEIVER_EMAIL,          
    subject,
    html,
    attachments: attachments?.map((a) => ({
      filename: a.filename,
      path: a.path,
    })),
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}
