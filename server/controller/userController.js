// import {User} from "../models/user.js"
import { Otp } from "../models/otp.js";
import { User } from "../models/user.js";
import { sendotp } from "../utils/sendotp.js";
import bcrypt from 'bcryptjs';



export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Step 1 - Check all fields
        if (!email || !password) {
            return res.status(400).json({ success: false,message: "All fields required" })
        }

        // Step 2 - Check email exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success: false, message: "Email not registered" })
        }

        // Step 3 - Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false,message: "Wrong password" })
        }

        // Step 4 - Login success
        return res.status(200).json({ 
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(500).json({success: false, message: error.message })
    }
}



export const registration=async (req,res)=>{
        const userdata=req.body;
        try {
            const email=userdata.email;
            console.log("details"+email);
 const duplicate = await User.findOne({ email })
        if (duplicate) {
            return res.status(400).json({success: false,message: "Email was alredy exist" })
        }

              const user = await Otp.findOne({ email })
        if (!user) {
            return res.status(400).json({success: false,message: "Email not Verified" })
        }

         

            const newuser=new User({
                 name: userdata.name,
    email: userdata.email,
    password: userdata.password
             });
             const result=await newuser.save();
              res.status(200).json({
            success: true,
            message: result
        });
        
       await Otp.deleteOne({ email })
        } catch (error) {
            console.log(userdata);
            console.log(error);
    return res.status(500).json({  success: false,message: error.message })
        }

}





export const verifyotp=async (req,res)=>{
    try {
        const {email,otp}=req.body;
        const result=await Otp.findOne({
            email: email,
            otp: otp
        });

         if (!result) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }


          res.status(200).json({
            success: true,
            message: "OTP verified"
        });
    } catch (error) {
        console.log(error+"i am in veryfy otp controller ");
    return res.status(500).json({ message: error.message })
    }
}


export const sendotptomail=async (req,res)=>{
    try {

        console.log(req.body+" this is body fo requeit ");
         console.log("headers:", req.headers["content-type"]);
       const {email}=req.body;
       const otp = Math.floor(1000 + Math.random() * 9000).toString();
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
       if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }
        await sendotp(email,otp);

    await Otp.findOneAndUpdate(
            { email },
            { otp },
            { upsert: true, returnDocument: 'after' }
        )

    
        return res.status(200).json({message: `otp was sentet to you gmail ${email}` })
        
    } catch (error) {
       console.log(error);
    return res.status(500).json({ message: error.message })
   }
}