import { sign } from "jsonwebtoken";
import nodemailer from "nodemailer";
const jwtSecret = process.env.JWT_SECRET as string;

export const generateToken = (email: string, staffId: string) => {
  const token = sign({ email, staffId }, jwtSecret, {
    expiresIn: "30d",
  });
  return token;
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
};

export const sendOTP = async (email: string) => {
  const otp = generateOTP();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com", // Your Gmail email address
      pass: "your_email_password", // Your Gmail email password or an app-specific password
    },
  });

  const mailOptions = {
    from: "your_email@gmail.com", // Your Gmail email address
    to: email,
    subject: "OTP Verification",
    text: `Your OTP: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return otp; // You can return the OTP if needed for further verification
  } catch (error) {
    console.error(`Error sending OTP: ${error.message}`);
    throw error;
  }
};
