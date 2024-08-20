const nodemailer = require("nodemailer");
const config = require("../config/config");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const transport = nodemailer.createTransport(config.email.smtp);

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, html: text };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token, origin) => {
  const subject = "Reset Password";
  const resetPasswordUrl = `${origin}/reset-password?token=${token}`;

  const text = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Your Password - Financial Ratio Platform</title>
    </head>
    <body style="background-color: #f7fafc; font-family: Arial, sans-serif; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="border-bottom: 2px solid #319795; padding-bottom: 10px; margin-bottom: 20px;">
          <h1 style="font-size: 24px; color: #319795;">Financial Ratio Platform</h1>
        </div>
        <p style="font-size: 16px; color: #2d3748;">
          We noticed you requested a password reset for your account on Financial Ratio Platform. Use the link below to reset your password.
        </p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="${resetPasswordUrl}" style="background-color: #319795; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; display: inline-block;">
            Click to Change Password
          </a>
        </p>
        <p style="font-size: 14px; color: #718096;">
          The link is valid for the next 10 minutes, so be sure to use it promptly.
        </p>
        <p style="font-size: 14px; color: #2d3748; margin-top: 20px;">
          Regards,<br />The Financial Ratio Platform Team
        </p>
        <div style="margin-top: 20px; border-top: 1px solid #319795; padding-top: 10px; font-size: 12px; color: #718096;">
          <p>Financial Ratio Platform Inc.</p>
          <p>123 Market Street, San Francisco, CA</p>
        </div>
      </div>
    </body>
  </html>`;

  await sendEmail(to, subject, text);
};

const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
  To verify your email, click on this link: ${verificationEmailUrl}
  If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
