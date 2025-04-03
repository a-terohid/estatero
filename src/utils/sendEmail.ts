import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Real Estate" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;