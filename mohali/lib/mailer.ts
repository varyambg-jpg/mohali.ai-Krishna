import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: `"Mohali Job Portal" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      html,
    });
  } catch (err: any) {
    console.error("Email send error:", err.message);
  }
}
