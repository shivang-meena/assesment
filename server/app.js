import "dotenv/config"  
import  cors from "cors"
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app=express();

import route from "./routes/userRoutes.js";

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
connectDB();

app.use("/user",route);

app.get("/",(req,res)=>{
    res.send("server was runnig ");
});

app.listen(3000,()=>{
   console.log("srver is running ");
});