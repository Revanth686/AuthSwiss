import nodemailer from "nodemailer";
//TODO: disable 2fa by default update schema and deoploy suxsfuli

const domain = process.env.NEXT_PUBLIC_APP_URL;

const sendMail = (email: string, subject: string, text: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // or 'yahoo', 'outlook', etc.
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD!.split("-").join(""),
    },
  });

  // Define the email options
  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  // Send the email
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error("Error sending email ", error!);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (error) {
    throw new Error("Error sending email ", error!);
  }
};
export const sendVerificationMail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/auth/verify-email?token=${token}`;
  sendMail(
    email,
    "Email verification mail",
    `Verify your email by clicking the link below: ${confirmationLink}`,
  );

  // Create a transporter using your email provider's SMTP settings
};

export const sendResetPasswordMail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  sendMail(
    email,
    "Reset password mail",
    `Reset your password by clicking the link below: ${resetLink}`,
  );
};

export const send2FactorMail = async (email: string, token: string) => {
  sendMail(
    email,
    "Two factor authentication mail",
    `Your two factor authentication token is: ${token}`,
  );
};
