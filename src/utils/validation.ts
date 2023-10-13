import { sign } from "jsonwebtoken";
import nodemailer from "nodemailer";
const jwtSecret = process.env.JWT_SECRET as string;
const password = process.env.SMTP_PASSWORD as string;
const username = process.env.SMTP_USERNAME as string;
const server = process.env.SMTP_SERVER as string;
const port = process.env.SMTP_PORT as unknown as number;

export const generateToken = (email: string, staffId: string) => {
  const token = sign({ email, staffId }, jwtSecret, {
    expiresIn: "30d",
  });
  return token;
};

export const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // Set expiry to 7 days from now
  return { otp, expiry };
};

export const sendOTP = async (
  email: string,
  otp: string,
  officialEmail: string,
  staffId: string
) => {
  const transporter = nodemailer.createTransport({
    host: server,
    port: port,
    auth: {
      user: username,
      pass: password,
    },
  });

  const mailOptions = {
    from: "heshR <heshr2023@gmail.com>",
    to: email,
    subject: "Account Verification OTP",
    text: `Your OTP: ${otp}`,
    html: `
    <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding:50px 20px; margin:auto; ">
      <h1 style="text-transform:uppercase; text-align:center; color:teal;">
        Welcome to HeshR
      </h1>
      <h2>Confirm your email address</h2>
      <p>
        An account has just been created for you on heshR. Enter the OTP below as your password alongside either your official email address or staff ID in the browser window on your first login.
      </p>
      <p>Your official email address is <strong>${officialEmail}</strong></p>
      <p>Your staff ID is <strong>${staffId}</strong></p>
      <h1>${otp}</h1>
      <p>Please enter this OTP to verify your account.</p>
      <p>Note that the OTP is only valid for 7 days.</p>
      <p>Questions about setting up heshR? Email us at heshr2023@gmail.com</p>
      <p>If you didn’t request this email, there’s nothing to worry about — you can safely ignore it.</p>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return otp;
  } catch (error) {
    console.error(`Error sending OTP: ${error.message}`);
    throw error;
  }
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const isValidPassword = (password: string) => {
  return passwordRegex.test(password);
};
