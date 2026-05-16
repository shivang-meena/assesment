import { createRequire } from "module";
const require = createRequire(import.meta.url);
const SibApiV3Sdk = require("@getbrevo/brevo");

export const sendotp = async (email, otp) => {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.sender = { email: process.env.EMAIL, name: "OTP Service" };
    sendSmtpEmail.subject = "Your OTP Verification Code";
    sendSmtpEmail.htmlContent = `<h2>Your OTP is: <b>${otp}</b></h2><p>Valid for 5 minutes</p>`;

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("otp sent successfully");
    } catch (error) {
        console.log("EMAIL ERROR:", error.message);
        throw error;
    }
};