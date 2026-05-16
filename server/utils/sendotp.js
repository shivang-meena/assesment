export const sendotp = async (email, otp) => {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
                sender: { email: process.env.EMAIL, name: "OTP Service" },
                to: [{ email: email }],
                subject: "Your OTP Verification Code",
                htmlContent: `<h2>Your OTP is: <b>${otp}</b></h2><p>Valid for 5 minutes</p>`
            })
        });

        const data = await response.json();
        console.log("otp sent successfully", data);
    } catch (error) {
        console.log("EMAIL ERROR:", error.message);
        throw error;
    }
};