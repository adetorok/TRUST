import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

export async function sendMail(to, subject, html) {
  return mailer.sendMail({
    from: process.env.EMAIL_FROM || 'TRUST <no-reply@trust.local>',
    to, subject, html
  });
}
