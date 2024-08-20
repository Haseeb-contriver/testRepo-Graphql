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

const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  const resetPasswordUrl = `https://financial-ratio-dashboard-frontend.vercel.app/reset-password?token=${token}`;
  // const text = `Dear user,
  // To reset your password, click on this link: ${resetPasswordUrl}
  // If you did not request any password resets, then ignore this email.`;
  const text = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Your Password - Financial Ratio Platform</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        function copyOTP() {
          const otpText = document.getElementById("link").innerText;
          const button = document.getElementById("copyButton");
          navigator.clipboard.writeText(otpText).then(() => {
            button.innerText = "Copied";
            button.classList.remove("bg-teal-600");
            button.classList.add("bg-teal-700");
  
            setTimeout(() => {
              button.innerText = otpText;
              button.classList.remove("bg-teal-700");
              button.classList.add("bg-teal-600");
            }, 1000);
          });
        }
      </script>
    </head>
    <body class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div
        class="font-sans w-full max-w-lg p-6 bg-white shadow-lg shadow-inner shadow-teal-200/50 rounded-md mx-4"
      >
        <div class="border-b border-teal-700 pb-4 mb-4">
          <a
            href="#"
            class="text-2xl font-semibold text-teal-600 hover:text-teal-500 no-underline"
            >Financial Ratio Platform</a
          >
        </div>
        <!-- <p class="text-xl text-teal-800">Hi <%= firstName %> <%= lastName %>,</p> -->
        <p class="text-lg text-gray-700 mt-4">
          We noticed you requested a password reset for your account on Financial
          Ratio Platform. Use the link below to reset your password. <br>
           ${resetPasswordUrl} <br>
          The link is
          valid for the next 10 minutes, so be sure to use it promptly.
        </p>
        <h2
          id="copyButton"
          onclick="copyOTP()"
          class="bg-teal-600 mt-6 mx-auto w-max px-4 py-2 text-white rounded-md text-center cursor-pointer"
        >
        </h2>
        <p class="text-sm text-teal-600 mt-8">
          regards,<br />The Financial Ratio Platform Team
        </p>
        <hr class="border-t border-teal-700 my-6" />
        <div class="text-right text-black text-xs font-medium leading-tight">
          <p class="text-teal-600">Financial Ratio Platform Inc.</p>
          <p>123 Market Street</p>
          <p>San Francisco, CA</p>
        </div>
      </div>
    </body>
  </html>
  `;
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
