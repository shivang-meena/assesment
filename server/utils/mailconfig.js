import "dotenv/config"  
import nodemailer from "nodemailer"
// import dotenv from "dotenv"

// dotenv.config();


console.log("EMAIL:", process.env.EMAIL); // ✅ add this
console.log("PASS:", process.env.PASS);   
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  // ✅ explicit host
    port: 587,               // ✅ use 587 instead of 465
    secure: false,           // ✅ false for port 587
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});


export default transporter;
