import mongoose, { model } from "mongoose";
const { Schema }=mongoose


const otpSchema=new Schema({
    name:String,
    email:{
        type:String,
    },
    password:String,
    otp:String
});




export let Otp=mongoose.model("Otp",otpSchema);
