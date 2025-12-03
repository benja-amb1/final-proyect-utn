import nodemailer from 'nodemailer';

const USER = process.env.EMAIL_USER;
const PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export default transporter