import "dotenv/config"  
import nodemailer from "nodemailer"
import transporter from "./mailconfig.js"
// import dotenv from "dotenv"

// dotenv.config();


// console.log("EMAIL:", process.env.EMAIL)
// console.log("PASS:", process.env.PASS)
export const sendotp = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Verification Code',
        html: `<h2>Your OTP is: <b>${otp}</b></h2>
               <p>Valid for 5 minutes only</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("otp sent successfully");
    } catch (error) {
        console.log("EMAIL ERROR:", error.message); // ✅ log the actual error
        throw error; // ✅ throw so controller gets 500 error
    }
};