import "dotenv/config"  
import nodemailer from "nodemailer"
// import dotenv from "dotenv"

// dotenv.config();


console.log("EMAIL:", process.env.EMAIL); // ✅ add this
console.log("PASS:", process.env.PASS);   
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});


export default transporter;
